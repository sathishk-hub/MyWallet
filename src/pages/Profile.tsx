import {Button, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import AppColors from '../utils/AppColors';
import AppSize from '../utils/AppSize';
import AppStyles from '../utils/AppStyles';
import FastImage from 'react-native-fast-image';
import Firebase from '../firebase/Firebase';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const iStyles = StyleSheet.create({
  surface: {
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: AppSize.vs(25),
  },
  headerIcon: {
    width: AppSize.hs(100),
    height: AppSize.vs(100),
    alignSelf: 'center',
    marginBottom: AppSize.vs(30),
  },
  greetingText: {
    fontSize: 32,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: AppColors.JapaneseLaurel,
    marginVertical: AppSize.vs(25),
  },
});

function Profile({navigation}: any): JSX.Element {
  const user = Firebase.getCurrentUser();
  const userName = user?.displayName || user?.email?.split('@')[0];

  return (
    <SafeAreaView style={iStyles.surface}>
      <Text style={iStyles.header}>My Wallet</Text>
      <FastImage
        style={iStyles.headerIcon}
        source={require('../asserts/wallet.png')}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={iStyles.greetingText}>{`Hi ${userName} `}</Text>

      <Button
        color={AppColors.JapaneseLaurel}
        style={[AppStyles.marginTop25, {marginHorizontal: AppSize.hs(50)}]}
        mode="contained"
        onPress={() => {
          Firebase.logout();
        }}>
        LOG OUT
      </Button>
    </SafeAreaView>
  );
}

export default Profile;
