import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'history-page scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 50 }]
  },
  'history-page ion-item-sliding': {
    'marginBottom': [{ 'unit': 'px', 'value': 10 }]
  },
  'history-page ion-scroll scroll-content': {
    'height': [{ 'unit': 'vh', 'value': 30 }]
  },
  'history-page view': {
    'paddingLeft': [{ 'unit': 'px', 'value': 8 }]
  },
  'history-page view ion-icon[item-left] + item-inner': {
    'marginLeft': [{ 'unit': 'px', 'value': 0 }]
  },
  'history-page view label-md': {
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'history-page list-md ion-item-options button': {
    'width': [{ 'unit': 'px', 'value': 100 }],
    'height': [{ 'unit': '%V', 'value': 1 }],
    'display': 'flex'
  },
  'history-page list-md ion-item-options button span': {
    'width': [{ 'unit': 'px', 'value': 100 }]
  }
});
