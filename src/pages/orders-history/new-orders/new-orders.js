import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'new-orders ion-item-slidingactive-slideactive-options-right ion-item-options': {
    'background': 'grey',
    'alignItems': 'center'
  },
  'new-orders scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 56 }]
  },
  'new-orders scroll-content infinite-loading': {
    'background': 'linear-gradient(to right, #adbd84 0%, #ced7b8 38%, whitesmoke 82%, whitesmoke 97%)',
    'paddingBottom': [{ 'unit': 'px', 'value': 5 }],
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }]
  },
  'new-orders scroll-content infinite-loading infinite-loading-text': {
    'fontWeight': 'bold'
  },
  'new-orders view': {
    // .confirm {
            font-size: 1rem;
            position: absolute;
            right: 0;
            bottom: 0;
            height: 35%;
            width: 34vw;
        }
        .more {
            font-size: 1rem;
            position: absolute;
            left: 0;
            height: 35%;
            width: 34vw;
            bottom: 0;
        }
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
  'new-orders view label-md': {
    'height': [{ 'unit': 'px', 'value': 100 }]
  },
  'new-orders view buttons': {
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'position': 'absolute',
    'left': [{ 'unit': 'px', 'value': 0 }],
    'bottom': [{ 'unit': 'px', 'value': 0 }],
    'height': [{ 'unit': '%V', 'value': 0.38 }]
  },
  'new-orders list-md ion-item-options button': {
    'width': [{ 'unit': 'px', 'value': 100 }],
    'height': [{ 'unit': '%V', 'value': 1 }]
  },
  'new-orders list-md ion-item-options button span': {
    'width': [{ 'unit': 'px', 'value': 100 }]
  },
  '*[normal]': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'fontSize': [{ 'unit': 'em', 'value': 0.7 }],
    'maxHeight': [{ 'unit': 'px', 'value': 26 }],
    'minHeight': [{ 'unit': 'px', 'value': 26 }]
  }
});
