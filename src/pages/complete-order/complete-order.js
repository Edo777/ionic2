import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'complete-order scroll-content': {
    'border': [{ 'unit': 'px', 'value': 5 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': '#adbd84' }]
  },
  'complete-order h1': {
    'padding': [{ 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }, { 'unit': 'px', 'value': 10 }]
  },
  'complete-order logo': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'backgroundRepeat': 'no-repeat',
    'height': [{ 'unit': 'vw', 'value': 80 }],
    'backgroundPosition': 'center',
    'backgroundImage': 'url("../assets/imgs/logo.png")'
  },
  'complete-order button-md': {
    'width': [{ 'unit': '%H', 'value': 1 }]
  }
});
