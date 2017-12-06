import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'new-orders ion-item-sliding item': {
    'background': 'orange',
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'new-orders ion-item-slidingactive-slideactive-options-right ion-item-options': {
    'background': 'grey',
    'alignItems': 'center'
  },
  'new-orders view number': {
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'width': [{ 'unit': 'string', 'value': 'fit-content' }],
    'position': 'absolute',
    'top': [{ 'unit': 'px', 'value': 10 }],
    'left': [{ 'unit': 'px', 'value': 10 }]
  },
  'new-orders view price': {
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'float': 'right',
    'width': [{ 'unit': '%H', 'value': 0.35 }],
    'display': 'flex',
    'height': [{ 'unit': '%V', 'value': 0.3 }],
    'alignItems': 'center',
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 0 }],
    'top': [{ 'unit': 'px', 'value': 0 }]
  },
  'new-orders view price span': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'new-orders view status': {
    'fontSize': [{ 'unit': 'em', 'value': 1 }],
    'position': 'absolute',
    'height': [{ 'unit': '%V', 'value': 0.31 }],
    'top': [{ 'unit': '%V', 'value': 0.3 }],
    'right': [{ 'unit': 'px', 'value': 0 }],
    'width': [{ 'unit': 'vw', 'value': 35 }],
    'display': 'flex',
    'alignItems': 'center'
  },
  'new-orders view status span': {
    'fontSize': [{ 'unit': 'em', 'value': 0.8 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'new-orders view confirm': {
    'fontSize': [{ 'unit': 'rem', 'value': 1 }],
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': '%V', 'value': 0.35 }],
    'width': [{ 'unit': 'vw', 'value': 34 }]
  },
  'new-orders view more': {
    'fontSize': [{ 'unit': 'rem', 'value': 1 }],
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': '%V', 'value': 0.35 }],
    'width': [{ 'unit': 'vw', 'value': 34 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'new-orders view label-md': {
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'new-orders list-md ion-item-options button': {
    'width': [{ 'unit': 'px', 'value': 100 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'new-orders list-md ion-item-options button span': {
    'width': [{ 'unit': 'px', 'value': 100 }]
  }
});
