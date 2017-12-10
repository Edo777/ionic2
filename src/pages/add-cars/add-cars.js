import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'add-cars ion-scroll scroll-content': {
    'height': [{ 'unit': 'vh', 'value': 30 }],
    'paddingLeft': [{ 'unit': 'px', 'value': 16 }]
  },
  'add-cars car-row': {
    'background': 'grey',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'black' }]
  },
  'add-cars cars-info': {
    'paddingRight': [{ 'unit': 'px', 'value': 16 }],
    // .active-car-brand {
            background: grey;
            padding: 16px 50px 16px 5px;
        }
  },
  'add-cars cars-info ion-grid': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'add-cars cars-info ion-grid car-row': {
    'background': 'grey',
    'borderBottom': [{ 'unit': 'px', 'value': 1 }, { 'unit': 'string', 'value': 'solid' }, { 'unit': 'string', 'value': 'black' }]
  }
});
