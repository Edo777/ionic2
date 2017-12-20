import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'orders-list scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 50 }]
  },
  'orders-list ion-item-sliding': {
    'marginBottom': [{ 'unit': 'px', 'value': 10 }]
  },
  'orders-list ion-scroll scroll-content': {
    'height': [{ 'unit': 'vh', 'value': 30 }]
  },
  'orders-list view': {
    'paddingLeft': [{ 'unit': 'px', 'value': 8 }]
  },
  'orders-list view ion-icon[item-left] + item-inner': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }]
  },
  'orders-list view label-md': {
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'orders-list list-md ion-item-options button': {
    'width': [{ 'unit': 'px', 'value': 100 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'display': 'flex'
  },
  'orders-list list-md ion-item-options button span': {
    'width': [{ 'unit': 'px', 'value': 100 }]
  }
});
