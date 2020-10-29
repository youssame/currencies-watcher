import React, { useState, useEffect } from 'react';
import Loading from '../components/Loading';
import styled from 'styled-components';
import { AsyncStorage } from 'react-native';
import { getAllCurrencies } from '../utils/API';
import SelectCurrencies from '../components/SelectCurrencies';
import { SafeAreaView } from 'react-native';
import CurrencyElement from '../components/CurrencyElement';
import { CURRENCIES_STORAGE_KEY, MAX_WATCHED_CURRENCIES, BASED_CURRENCY_STORAGE_KEY, WATCHED_CURRENCIES_STORAGE_KEY } from '../utils/constants';
import { handleClickedNotification } from '../utils/Notifications';
const Currencies = ({ route, navigation }) => {
    const [loading, setLoading] = useState(true);
    const [currencies, setCurrencies] = useState(null);
    const [basedCurrency, setBasedCurrency] = useState(null);
    const [watchedCurrencies, setWatchedCurrencies] = useState([]);
    const configure = !route.params ? false : route.params.configure;

    useEffect(() => {
        loadAllCurrencies();
        loadStoredCurrencies();
    }, []);
    useEffect(() => {
        const clickedNotificationSubscription = handleClickedNotification((notification) => {
            const data = notification.notification.request.content.data;
            if (data && data.loadData) {
                loadAllCurrencies();
                loadStoredCurrencies();
            }
        })
        return () => {
          clickedNotificationSubscription.remove();
        };
      }, []);
    const loadAllCurrencies = async () => {
        const value = await AsyncStorage.getItem(CURRENCIES_STORAGE_KEY);
        if (!value || value === null) {
            getAllCurrencies().then((response) => response.json())
            .then(async (json) => {
              if (json && json.results) {
                await AsyncStorage.setItem(
                    CURRENCIES_STORAGE_KEY,
                    JSON.stringify(json.results)
                  );
                  setCurrencies(JSON.stringify(json.results));
                  setLoading(false);
              }
            })
            .catch((error) => {
                setLoading(false);
                console.error({error});
            });
        } else {
            setCurrencies(value);
            setLoading(false);
        }

    }
    const loadStoredCurrencies = async () => {
        const watchedCurrs = await AsyncStorage.getItem(WATCHED_CURRENCIES_STORAGE_KEY);
        const basedCurr = await AsyncStorage.getItem(BASED_CURRENCY_STORAGE_KEY);
        const watched = JSON.parse(watchedCurrs);
        const based = JSON.parse(basedCurr);
        if (watchedCurrs)
            setWatchedCurrencies(watched);
        if (basedCurr)
            setBasedCurrency(based);
        if (!configure)
            navigation.navigate('Charts', { watched, based })
    }

    if (loading)
        return <Loading />

    const selectBasedCurrency = async (curr) => {
        await AsyncStorage.setItem(
            BASED_CURRENCY_STORAGE_KEY,
            JSON.stringify(curr)
        );
        setBasedCurrency(curr);
    }
    const selectWatchedCurrency = async (curr) => {
        if (watchedCurrencies.length === MAX_WATCHED_CURRENCIES) {
            alert(`You reach the max currencies to watch`);
            return;
        }
        await AsyncStorage.setItem(
            WATCHED_CURRENCIES_STORAGE_KEY,
            JSON.stringify([...watchedCurrencies, curr])
        );
        setWatchedCurrencies([...watchedCurrencies, curr]);
    };
    const removeWatchedCurrency = async (index) => {
        const tempCurrs = [...watchedCurrencies];
        tempCurrs.splice(index, 1);
        await AsyncStorage.setItem(
            WATCHED_CURRENCIES_STORAGE_KEY,
            JSON.stringify(tempCurrs)
        );
        setWatchedCurrencies(tempCurrs);
    }
    const Text = styled.Text`
        text-align: center;
        padding-bottom: 10px;
        font-size: 18px;
        color: #353b48;
        font-weight: bold;
    `;
    const View = styled.View`
        justify-content: space-around;
        align-items: center;
        flex: 1;
    `;
    const SubView = styled.View`
        justify-content: center;
        align-items: center;
    `;
    const CurrenciesView = styled.View`
        width: 320px;
        display: flex;
        flex-direction: row;
        justify-content: center;

    `;


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <SubView>
                    <Text>Select your based currency</Text>
                    <SelectCurrencies currencies={currencies} action={selectBasedCurrency} />
                    {basedCurrency ? <CurrencyElement state='active' id={basedCurrency.id} name={basedCurrency.id} /> : <></>}
                </SubView>
                <SubView>
                    <Text>Select the currencies that you want to watch</Text>
                    <SelectCurrencies currencies={currencies} basedCurrency={basedCurrency}  action={selectWatchedCurrency}  />
                    <CurrenciesView>
                        { watchedCurrencies.map((currency, index) => <CurrencyElement state='active' key={index} id={currency.id} name={currency.id} remove={ () => { removeWatchedCurrency(index) } } /> ) }
                    </CurrenciesView>
                </SubView>

            </View>
        </SafeAreaView>
    );
}

export default Currencies;
