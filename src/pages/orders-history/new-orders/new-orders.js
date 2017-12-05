import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'new-orders ion-item-sliding item': {
    'background': 'orange',
    'height': [{ 'unit': 'vw', 'value': 30 }]
  },
  'new-orders ion-item-slidingactive-slideactive-options-right ion-item-options': {
    'background': 'rgba(10, 100, 10, 0.5)'
  },
  'new-orders view number': {
    'width': [{ 'unit': 'string', 'value': 'fit-content' }],
    'marginTop': [{ 'unit': 'px', 'value': 10 }],
    'float': 'left'
  },
  'new-orders view price': {
    'float': 'right',
    'width': [{ 'unit': 'vw', 'value': 35 }],
    'display': 'flex',
    'height': [{ 'unit': '%V', 'value': 0.3 }],
    'alignItems': 'center',
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 0 }]
  },
  'new-orders view price span': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }, { 'unit': 'px', 'value': 0 }, { 'unit': 'string', 'value': 'auto' }]
  },
  'new-orders view status': {
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
    'position': 'absolute',
    'right': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': '%V', 'value': 0.35 }],
    'width': [{ 'unit': 'vw', 'value': 34 }]
  },
  'new-orders view more': {
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': '%V', 'value': 0.35 }],
    'width': [{ 'unit': 'vw', 'value': 34 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }]
  },
  'new-orders view label-md': {
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'new-orders list-md ion-item-options button': {
    'width': [{ 'unit': 'vw', 'value': 30 }],
    'height': [{ 'unit': 'vw', 'value': 30 }],
    'marginLeft': [{ 'unit': 'vw', 'value': 5 }],
    'marginRight': [{ 'unit': 'vw', 'value': 5 }]
  },
  'new-orders list-md ion-item-options button span': {
    'width': [{ 'unit': 'vw', 'value': 30 }]
  }
});
