import {Button, TextInput} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import AppColors from '../utils/AppColors';
import AppSize from '../utils/AppSize';
import AppStyles from '../utils/AppStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

const iStyles = StyleSheet.create({
  surface: {
    flex: 1,
    justifyContent: 'center',
  },
  loginBtn: {marginTop: AppSize.vs(25), alignItems: 'center'},
});

function Login(): JSX.Element {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  

  useEffect(() => {

    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount

    
  }, []);

  if (initializing) return <></>;
  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={iStyles.surface}>
      <View style={AppStyles.marginHorizontal25}>
        <TextInput
          mode="outlined"
          label="Username"
          value={text}
          activeOutlineColor={AppColors.JapaneseLaurel}
          placeholder="Enter your username"
          onChangeText={text => setText(text)}
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
            onPress={() => console.log('Pressed')}>
            <Text>Login</Text>
          </Button>
          <Text>{user}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
