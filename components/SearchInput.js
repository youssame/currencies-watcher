import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({placeholder, action}) => {
    let search = '';
    const TextInput = styled.TextInput`
        width: 100%;
        max-width: 100%;
        border-radius: 5px;
        padding: 10px 15px;
        color: #2f3640;
        text-align: left;
    `;
    const View = styled.View`
        flex:1;
        flex-direction: row;
        justify-content: space-around;
        max-width: 100%;
        width: 100%;
        flex: 0 0 100%;
        margin-bottom: 15px;
        padding: 0 15px;
    `;
    const TouchableOpacity = styled.TouchableOpacity`
            width: 50px;
            height: 50px;
            background-color: #192a56;
            text-align: center;
            align-items: center;
            border-radius: 50px;
            justify-content: center;
    `;
    const _handleTextChange = (txt) => { search = txt }
    return (
        <View>
            <TextInput placeholder={placeholder} onChangeText={_handleTextChange} />
            <TouchableOpacity onPress={() => {action(search)}}>
                <Ionicons name="ios-search" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default SearchInput;
