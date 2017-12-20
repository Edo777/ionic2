import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'page-home ion-header item-md': {
    'background': 'linear-gradient(to right, #adbd84 0%, #ced7b8 38%, whitesmoke 82%, whitesmoke 97%)'
  },
  'page-home scroll-content': {
    'display': 'flex',
    'alignItems': 'center',
    'paddingBottom': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': '!important' }]
  },
  'page-home scroll-content list-md': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }],
    'minWidth': [{ 'unit': '%H', 'value': 0.8 }],
    'maxWidth': [{ 'unit': '%H', 'value': 0.8 }]
  },
  'page-home color-red': {
    'color': 'red'
  },
  'page-home color-green': {
    'color': 'green'
  }
});
