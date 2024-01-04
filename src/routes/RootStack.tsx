import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {type RootStackParams} from './RootStackParams';
import BottomTab from './BottomTab';
import Login from '../pages/onboarding/Login';
import Onboard from '../pages/onboarding/Onboard';
import Register from '../pages/onboarding/Register';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const Stack = createStackNavigator<RootStackParams>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
  {
    name: 'Onboard',
    component: Onboard,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'Register',
    component: Register,
  },
];

function RootStack(): JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const onAuthState = async () => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
    });
  };
  useEffect(() => {
    onAuthState();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={user ? 'BottomTab' : 'Onboard'}
      screenOptions={{
        headerShown: false,
      }}>
      {routes.map(routeConfig => (
        <Stack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </Stack.Navigator>
  );
}

export default RootStack;
