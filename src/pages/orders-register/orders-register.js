import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'orders-register ion-content scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '!important' }]
  },
  'orders-register ion-scroll scroll-content': {
    'height': [{ 'unit': 'vh', 'value': 40 }]
  },
  'orders-register #map': {
    'width': [{ 'unit': '%H', 'value': 1 }]
  },
  'orders-register cars-info': {
    'paddingLeft': [{ 'unit': 'px', 'value': 22 }]
  },
  'orders-register cars-info ion-grid': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'orders-register cars-info ion-grid car-row': {
    'background': 'grey',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'black' }]
  },
  'orders-register cars-info active-car-brand': {
    'background': 'grey',
    'padding': [{ 'unit': 'px', 'value': 16 }, { 'unit': 'px', 'value': 50 }, { 'unit': 'px', 'value': 16 }, { 'unit': 'px', 'value': 5 }]
  }
});
