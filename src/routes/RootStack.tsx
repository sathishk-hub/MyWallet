import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {type RootStackParams} from './RootStackParams';
import BottomTab from './BottomTab';

const Stack = createStackNavigator<RootStackParams>();

const routes: Array<React.ComponentProps<typeof Stack.Screen>> = [
  {
    name: 'BottomTab',
    component: BottomTab,
  },
];

function RootStack(): JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="BottomTab"
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
