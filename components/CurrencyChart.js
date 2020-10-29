import React from 'react';
import styled from 'styled-components';
import { Dimensions } from 'react-native';
import {
    LineChart
  } from 'react-native-chart-kit';

const View = styled.View`
    flex: 1;
    align-items: center
`;
const Text = styled.Text`
    flex: 1;
    text-align: center;
    font-weight: bold;
    font-size: 14px;
`;

const CurrencyChart = ({ name, days, values, based = '$' }) => {
    const chartWidth = Dimensions.get("window").width - 10;
    return (
        <View>
            <Text>{name}</Text>
            <LineChart
            data={{
                labels: days,
                datasets: [
                {
                    data:  values
                }
                ]
            }}
            width={chartWidth} // from react-native
            height={220}
            yAxisLabel={ based.id }
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                borderRadius: 16
                },
                propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
            />
      </View>
    );
}

export default CurrencyChart;
