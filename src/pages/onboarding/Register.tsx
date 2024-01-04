import {Button, Colors, IconButton, Text, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

import AppColors from '../../utils/AppColors';
import AppSize from '../../utils/AppSize';
import AppStyles from '../../utils/AppStyles';
import Firebase from '../../firebase/Firebase';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {User} from '../../types/Types';

const iStyles = StyleSheet.create({
  surface: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.green50,
  },
  loginBtn: {marginTop: AppSize.vs(25), alignItems: 'center'},
});

function Register(): JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={iStyles.surface}>
      <View style={AppStyles.marginHorizontal25}>
        <TextInput
          mode="outlined"
          label="Username"
          value={email}
          activeOutlineColor={AppColors.JapaneseLaurel}
          placeholder="Enter your username"
          onChangeText={email => setEmail(email)}
        />
        <TextInput
          style={AppStyles.marginTop25}
          activeOutlineColor={AppColors.JapaneseLaurel}
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={iStyles.loginBtn}>
          <Button
            color={AppColors.JapaneseLaurel}
            mode="contained"
            onPress={() => {
              Firebase.createUser({email, password} as User);
            }}>
            Sign Up
          </Button>
          <Text style={{marginTop: AppSize.hs(50)}}> or Login With</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: Colors.orange50,
              alignItems: 'center',
              width: AppSize.hs(200),
              borderRadius: AppSize.hs(10),
              marginTop: AppSize.hs(10),
              borderColor: Colors.orange800,
              borderWidth: AppSize.hs(1),
            }}>
            <IconButton
              icon="google"
              color={Colors.orange900}
              size={AppSize.hs(30)}
              onPress={() => {
                Firebase.onGoogleSignin();
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Register;
