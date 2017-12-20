import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  '*[top]': {
    'top': [{ 'unit': 'px', 'value': 56 }]
  },
  'list-ios item-block item-inner': {
    'minHeight': [{ 'unit': 'px', 'value': 50 }],
    'maxHeight': [{ 'unit': 'px', 'value': 50 }]
  },
  'toast-md toast-message': {
    'backgroundColor': '#adbd84',
    'color': 'white',
    'fontSize': [{ 'unit': 'rem', 'value': 1.7 }],
    'minHeight': [{ 'unit': 'px', 'value': 56 }],
    'maxHeight': [{ 'unit': 'px', 'value': 56 }]
  },
  'toolbar-background-md': {
    'background': 'linear-gradient(to right, #adbd84 0%, #ced7b8 38%, whitesmoke 82%, whitesmoke 97%)'
  },
  'ion-item-sliding item': {
    'backgroundColor': '#adbd84',
    'height': [{ 'unit': 'px', 'value': 100 }]
  }
});
