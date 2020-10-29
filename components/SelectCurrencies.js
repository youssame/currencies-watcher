import React, { useState, useEffect }  from 'react';
import styled from 'styled-components';
import Loading from './Loading';
import CurrencyElement from './CurrencyElement';
import { ScrollView } from 'react-native';
import SearchInput from './SearchInput';

const SelectCurrencies = ({ currencies, action, basedCurrency }) => {
    const [parsedCurrencies, setCurrencies] = useState(null);
    const [filtredCurrencies, setFiltredCurrencies] = useState([]);
    const getCurrencies = async (search) => {
        const filterFunc = (currency) => {
            const isNotBAsed = basedCurrency ? basedCurrency != currency.id : true;
            const currencySymbol = currency.currencySymbol ? currency.currencySymbol.toUpperCase().indexOf(search.toUpperCase()) > -1 : false;
            const currencyName = currency.currencyName ? currency.currencyName.toUpperCase().indexOf(search.toUpperCase()) > -1 : false;
            const isId = currency.id ? currency.id.toUpperCase().indexOf(search.toUpperCase()) > -1 : false;
            return  isNotBAsed && (currencySymbol || currencyName || isId)
        }
        const filtredCurrencies = Object.values(parsedCurrencies).filter(filterFunc);
        setFiltredCurrencies(filtredCurrencies);
    }


    useEffect(() => {
        setCurrencies(JSON.parse(currencies));
    }, []);

    const renderCurrencies = () => {
        const currs = filtredCurrencies.map((currency, index) => <CurrencyElement key={index} id={ currency.id } name={currency.currencyName} action={ action } />);
        return currs;
    }
    const View = styled.View`
        width: 100%;
        max-width: 100%;
        overflow: scroll;
        justify-content: space-between;
        flex-wrap: wrap;
        flex-direction: row;
        padding: 15px;
    `;
    return (
        <>
        { !parsedCurrencies || Object.values(parsedCurrencies) === 0 ? <Loading /> : (
        <View style={{ height: filtredCurrencies.length > 0 ? 170 : 80 }}>
            <SearchInput placeholder="EUR, France..." action={getCurrencies} />
            <ScrollView horizontal>
            { renderCurrencies() }
            </ScrollView>
        </View>
        ) }
        </>
    );
}

export default SelectCurrencies;
