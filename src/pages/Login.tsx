import {Button, TextInput} from 'react-native-paper';
import {Text, View} from 'react-native';

import AppColors from '../utils/AppColors';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

function Login(): JSX.Element {
  const [text, setText] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{marginHorizontal: 25}}>
        <TextInput
          mode="outlined"
          label="Username"
          value={text}
          activeOutlineColor={AppColors.JapaneseLaurel}
          placeholder="Enter your username"
          onChangeText={text => setText(text)}
        />
        <TextInput
          style={{marginTop: 25}}
          activeOutlineColor={AppColors.JapaneseLaurel}
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <View style={{marginTop: 25, alignItems: 'center'}}>
          <Button
            color={AppColors.JapaneseLaurel}
            mode="contained"
            onPress={() => console.log('Pressed')}>
           <Text>Login</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
