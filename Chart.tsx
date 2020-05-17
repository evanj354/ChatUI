import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, Platform, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';


import { LineChart } from 'react-native-chart-kit';
import { globalColors, globalStyles, globalSizes } from './globalStyles/globalStyles';


const Chart = (props) => {
  const { height, width, hide, messageChunks, dateChunks, fetchData, currentPeriod } = props;
  
  let [dataPoints, updateData] = useState(messageChunks);
  let [dataLabels, updateDataLabels] = useState(dateChunks);
  let [periodLabel, updatePeriodLabel] = useState('day');

  useEffect( () => {
    updateData(messageChunks);
    updateDataLabels(dateChunks);
  });

  let data = {
    labels: dataLabels,
    datasets: [ 
      {
        data: dataPoints,
        strokeWidth: 2,
      }
    ]
  };

  const buttons = [['day',1], ['week',7], ['month',30]];
  

  if (hide) {
    return null;
  }

  const updateColor = (buttonPeriod) => {
    return buttonPeriod==currentPeriod ? 'rgba(68, 189, 116, 0.6)' : 'rgba(51,51,51,0.2)'
  }

  return (
    <View style={styles.chartContainer}>
      <View style={styles.graphTitleContainer}>
        <Text style={styles.graphTitle}>Gramatical Score over past 5 {periodLabel}s</Text>
      </View>
      <View style={styles.buttonContainer}>
          {buttons.map( (period) => 
            <TouchableHighlight
              key={period[1]}
              style={{...styles.changeChartButton, backgroundColor: updateColor(period[1])}}
              onPress={() => { fetchData(period[1]); updatePeriodLabel(period[0]); }}
            >
              <Text style={styles.buttonText}>{period[0]}</Text>
            </TouchableHighlight>
          )}
          
      </View>
      <LineChart
        data={data}
        width={width}
        height={height}
        yAxisSuffix='%'
        // renderDotContent={({x,y,index}) => <Text style={{...styles.dotContent,top: y-20, left: x}}>{index!=0?y:''}</Text>}
        onDataPointClick={({value, dataset, getColor})=><Text>{value}</Text>}
        chartConfig={{
          backgroundColor: globalColors.modalBlue,
          backgroundGradientFrom: globalColors.modalBlue,
          backgroundGradientTo: '#fff',
          fillShadowGradient: 'rgba(68, 189, 116, 0.9)',
          decimalPlaces: 2,
          color: (opacity=1) => `rgba(51,102,153, ${opacity})`,
          labelColor: (opacity=0.3) => `rgba(51,102,153, ${opacity})`,
          propsForDots: {
            stroke: 'rgba(68, 189, 116, 0.2)'
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
  dateChunks: PropTypes.array,
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
  },
  dotContent: {
    position: 'relative',
    color: globalColors.modalBlue,
  },
  graphTitleContainer: {
    width: 200,
    alignSelf: 'center',
    borderTopColor: 'rgba(255, 255, 255, 0.7)', 
    borderTopWidth: 2,
    paddingTop: 10,
    marginBottom: 7,
  },
  graphTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  }
  
})


export default Chart; 