import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'user-account button-md': {
    'height': [{ 'unit': 'em', 'value': 5 }],
    'textTransform': 'capitalize'
  },
  'user-account scroll-content': {
    'paddingBottom': [{ 'unit': 'px', 'value': 56 }]
  },
  'user-account logo': {
    'width': [{ 'unit': '%H', 'value': 1 }],
    'backgroundRepeat': 'no-repeat',
    'height': [{ 'unit': 'vw', 'value': 80 }],
    'backgroundPosition': 'center',
    'backgroundImage': 'url("../assets/imgs/logo.png")'
  }
});
