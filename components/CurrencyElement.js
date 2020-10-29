import React from 'react';
import styled from 'styled-components';

const CurrencyElement = ({ id, name, state, action, remove}) => {
    const _handelPress = () => {
        if (action) {
            action({id, name});
            return;
        }
        if (remove) {
            remove();
            return;
        }
    }
    const TouchableOpacity = styled.TouchableOpacity`
        width: auto;
        padding-left: 10px;
        padding-right: 10px;
        max-width: 100%;
        height: 50px;
        background-color: ${state && state === 'active' ?  '#44bd32': '#273c75' };
        text-align: center;
        border-radius: 5px;
        margin: 5px;
        position: relative;
    `;
    const Text = styled.Text`
        line-height: 50px;
        text-align: center;
        color: #ffffff;
        font-weight: bold;
        font-size: 15px;
    `;
    const RemoveText = styled.Text`
        position: absolute;
        right: 3px;
        top: 0px;
        font-weight: bold;
        color: #192a56;
    `;
    return (
        <TouchableOpacity onPress={_handelPress}>
            { remove && <RemoveText>x</RemoveText> }
            <Text>
                {name}
            </Text>
        </TouchableOpacity>
    );
}

export default CurrencyElement;
