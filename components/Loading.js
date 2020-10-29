import React from 'react';
import { ActivityIndicator, StyleSheet } from "react-native";
import styled from 'styled-components'

const View = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;

`;
const Loading = () => {
    return (
        <View>
            <ActivityIndicator size="large" color="#353b48" />
        </View>
    );
}
export default Loading;
