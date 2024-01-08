import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {type RootStackParams} from './RootStackParams';
import BottomTab from './BottomTab';
import Login from '../pages/onboarding/Login';
import Onboard from '../pages/onboarding/Onboard';
import Register from '../pages/onboarding/Register';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator<RootStackParams>();

const homeRoutes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
];

const authRoutes: Array<React.ComponentProps<typeof Stack.Screen>> = [
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
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTab'}
      screenOptions={{
        headerShown: false,
      }}>
      {homeRoutes.map(routeConfig => (
        <Stack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Onboard'}
      screenOptions={{
        headerShown: false,
      }}>
      {authRoutes.map(routeConfig => (
        <Stack.Screen key={routeConfig.name} {...routeConfig} />
      ))}
    </Stack.Navigator>
  );
};

function RootStack(): JSX.Element {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  if (initializing) return <></>;

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen
          name={'Home'}
          component={HomeStack}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name={'Auth'}
          component={AuthStack}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default RootStack;
