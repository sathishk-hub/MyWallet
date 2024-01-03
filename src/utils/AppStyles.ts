import AppSize from './AppSize';
import {StyleSheet} from 'react-native';

const AppStyles = StyleSheet.create({
  marginHorizontal25: {
    marginHorizontal: AppSize.hs(25),
  },
  marginTop25:{
    marginTop: AppSize.vs(25)
  }
});

export default AppStyles;
