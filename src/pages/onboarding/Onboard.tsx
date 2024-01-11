import {StyleSheet, View} from 'react-native';

import AppColors from '../../utils/AppColors';
import AppSize from '../../utils/AppSize';
import AppStyles from '../../utils/AppStyles';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const iStyles = StyleSheet.create({
  surface: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: AppSize.hs(75),
  },
});

function Onboard({navigation}: any): JSX.Element {
  return (
    <SafeAreaView style={iStyles.surface}>
      <LinearGradient
        colors={['#90caf9', '#2196f3', '#1565c0']}
        style={iStyles.gradient}>
        <View style={AppStyles.marginHorizontal25}>
          <Button
            color={AppColors.JapaneseLaurel}
            mode="contained"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Login
          </Button>
          <Button
            color={AppColors.JapaneseLaurel}
            style={AppStyles.marginTop25}
            mode="contained"
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Sign Up
          </Button>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default Onboard;
