import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
  import Loading from '../components/Loading';
import { AsyncStorage, Alert, SafeAreaView } from 'react-native';
import { LAST_CHECKED_DATE, STORED_CONVERTED_CURRENCIES } from '../utils/constants';
import { convertTwoCurrencies, saveMobileToken } from '../utils/API';
import CurrencyChart from '../components/CurrencyChart';

const ScrollView = styled.ScrollView`
    flex: 1;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 20px;
`;

const getTodayDate = (small = false) => {
    const d = new Date();
    const month = d.getMonth()+1;
    const day = d.getDate();
    const year = d.getFullYear();
    if (small) 
        return (day.length === 1 ? '0' + day : day)  + "/" + (month.length === 1 ? '0' + month : month);
    var datestring = day  + "-" + month + "-" + year;
    return datestring;
}

const RenderCurrCharts = ({ currencies, based }) => {
    const keys = Object.keys(currencies).filter(key => key !== "DATES");
    return (
        <>
            {
              keys.map(key => {
                return <CurrencyChart key={key} name={key} days={currencies.DATES} values={currencies[key]} based={ based } />
            })  
            }
        </>
    )
}
const Charts = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [currencies, setCurrencies] = useState(null);
    const { watched, based } = route.params;
    const loadWatchedCurrencies = async () => {
        try {
            const lastCheckedDay =  await AsyncStorage.getItem(LAST_CHECKED_DATE);
            let storedConvertedCurrencies =  await AsyncStorage.getItem(STORED_CONVERTED_CURRENCIES);
            storedConvertedCurrencies = JSON.parse(storedConvertedCurrencies);
            if (!lastCheckedDay || lastCheckedDay !== getTodayDate() || !storedConvertedCurrencies) {
                if (!watched || !based) {
                    navigation.navigate('Home', { configure: true });
                    return;
                }
                if (!storedConvertedCurrencies)
                    storedConvertedCurrencies = {};
                
                for (let index = 0; index < watched.length; index++) {
                    const curr = watched[index];
                    const {results: value} = await convertTwoCurrencies(curr.id, based.id);
                    const res_key = curr.id + "_" +based.id;
                    if (value && value[res_key] && value[res_key].val) {
                        const val = value[res_key].val;
                        if (storedConvertedCurrencies[curr.id]) {
                            storedConvertedCurrencies[curr.id] = [...storedConvertedCurrencies[curr.id], val];
                        } else {
                            storedConvertedCurrencies[curr.id] = [val];
                        }
                        if (storedConvertedCurrencies.DATES) {
                            const exist = storedConvertedCurrencies.DATES.findIndex(date => date === getTodayDate(true)) === -1;
                            if (exist)
                                storedConvertedCurrencies.DATES.push(getTodayDate(true));
                        } else {
                            storedConvertedCurrencies.DATES = [getTodayDate(true)];
                        }
                    }
                }
                await AsyncStorage.setItem(LAST_CHECKED_DATE, getTodayDate());
                await AsyncStorage.setItem(STORED_CONVERTED_CURRENCIES, JSON.stringify(storedConvertedCurrencies));
                setCurrencies(storedConvertedCurrencies);
                setLoading(false);

            } else {
                setCurrencies(storedConvertedCurrencies);
                setLoading(false);
            }
        } catch (error) {
            console.log({ error });
            setLoading(false);
        }
    }
    useEffect(() => {
        loadWatchedCurrencies();
    }, []);

    if (loading) 
        return <Loading />
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                { currencies ? <RenderCurrCharts currencies={ currencies } based={ based } /> : <></> }
            </ScrollView>
      </SafeAreaView>
    );
}

export default Charts;
