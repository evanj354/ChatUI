import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, Platform, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';


import { LineChart } from 'react-native-chart-kit';
import { globalColors, globalStyles, globalSizes } from './globalStyles/globalStyles';


const Chart = (props) => {
  const { height, width, hide, messageChunks, fetchData, currentPeriod } = props;
  
  let [dataPoints, updateData] = useState(messageChunks);

  useEffect( () => {
    updateData(messageChunks);
  });

  console.log(dataPoints);

  let data = {
    labels: ['0', '1', '2', '3', '4'],
    datasets: [ 
      {
        data: dataPoints,
        strokeWidth: 2,
      }
    ]
  };

  let dataWeek = [0.1, 0.2, 0.3, 0.4, 0.5]; 
  let buttons = [['day',1], ['week',7], ['month',30]];
  
  // buttons.map((button) => {console.log(button[0])});

  const updateChart = () => {
    updateData(dataWeek);
    console.log(data.datasets[0].data);
  }

  if (hide) {
    return null;
  }

  const updateColor = (buttonPeriod) => {
    return buttonPeriod==currentPeriod ? globalColors.modalBlue : 'rgba(68, 189, 116, 0.6)'
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.buttonContainer}>
          {buttons.map( (period) => 
            <TouchableHighlight
              key={period[1]}
              style={{...styles.changeChartButton, backgroundColor: updateColor(period[1])}}
              onPress={() => { fetchData(period[1]) }}
            >
              <Text style={styles.buttonText}>{period[0]}</Text>
            </TouchableHighlight>
          )}
          
      </View>
      <LineChart
        
        data={data}
        width={width}
        height={height}
        chartConfig={{
          backgroundColor: globalColors.modalBlue,
          backgroundGradientFrom: globalColors.modalBlue,
          backgroundGradientTo: '#fff',
          decimalPlaces: 2,
          color: (opacity=1) => `rgba(51,102,153, ${opacity})`,
          labelColor: (opacity=0.3) => `rgba(51,102,153, ${opacity})`,
          
          style: {
            
          },
          propsForDots: {
            stroke: 'rgba(68, 189, 116, 0.6)',
          },
          propsForLabels: {
            fontWeight: 'bold'
          }
        }}
        bezier
        style={{marginVertical: 10, borderRadius: 8}}
      />

      
    </View>
  )
}

Chart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.element,
    ])),
  ]),
  height: PropTypes.number,
  width: PropTypes.number,
  hide: PropTypes.bool,
  messageChunks: PropTypes.array,
  fetchData: PropTypes.func,
  currentPeriod: PropTypes.number
};

const styles = StyleSheet.create({
  chartContainer: {
    
  },
  changeChartButton: {
    backgroundColor: 'rgba(68, 189, 116, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 30,
    borderRadius: 5,
    borderColor: globalColors.white,
    borderWidth: 2
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "space-around"
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: globalColors.white,
  }
  
})


export default Chart; 