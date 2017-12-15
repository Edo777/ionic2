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
    'backgroundColor': '#889676',
    'color': 'white',
    'fontSize': [{ 'unit': 'rem', 'value': 1.7 }],
    'minHeight': [{ 'unit': 'px', 'value': 56 }],
    'maxHeight': [{ 'unit': 'px', 'value': 56 }]
  }
});
