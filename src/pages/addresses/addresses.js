import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'addresses scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 50 }]
  },
  'addresses ion-item-sliding': {
    'marginBottom': [{ 'unit': 'px', 'value': 10 }]
  },
  'addresses ion-scroll scroll-content': {
    'height': [{ 'unit': 'vh', 'value': 30 }]
  },
  'addresses view': {
    'paddingLeft': [{ 'unit': 'px', 'value': 8 }]
  },
  'addresses view ion-icon[item-left] + item-inner': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }]
  },
  'addresses view label-md': {
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'addresses list-md ion-item-options button': {
    'width': [{ 'unit': 'px', 'value': 100 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'display': 'flex'
  },
  'addresses list-md ion-item-options button span': {
    'width': [{ 'unit': 'px', 'value': 100 }]
  }
});
