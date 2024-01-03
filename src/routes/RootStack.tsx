import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {type RootStackParams} from './RootStackParams';
import BottomTab from './BottomTab';
import Login from '../pages/Login';

const Stack = createStackNavigator<RootStackParams>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
  {
    name: 'Login',
    component: Login,
  },
];

function RootStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Login"
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
