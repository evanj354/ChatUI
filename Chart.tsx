import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, Platform, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';


import { LineChart } from 'react-native-chart-kit';
import { globalColors, globalStyles, globalSizes } from './globalStyles/globalStyles';


const Chart = (props) => {
  const { height, width, hide } = props;
  
  let [dataPoints, updateData] = useState([0.3, 0.5, 0.6, 0.7, 0.8]);

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
  let buttons = ['day', 'week', 'month'];
  
  const updateChart = () => {
    updateData(dataWeek);
    console.log(data.datasets[0].data);
  }

  if (hide) {
    return null;
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.changeChartButton}
          onPress={() => {updateChart()}}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableHighlight>
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
  
};

const styles = StyleSheet.create({
  chartContainer: {
    
  },
  changeChartButton: {
    backgroundColor: 'rgba(68, 189, 116, 0.6)'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: globalSizes.smallFont
  }
  
})


export default Chart; 