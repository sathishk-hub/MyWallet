import {ColorValue} from 'react-native';
import Home from '../pages/Home';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {RootStackParams} from './RootStackParams';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootStackParams>();

const Icon = ({
  name,
  size = 28,
  color,
}: {
  name: string;
  size: number;
  color: ColorValue;
}) => {
  return <Icons name={name} size={size} color={color} />;
};

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          return {
            Home: <Icon name={'home'} color={color} size={size} />,
            Spent: (
              <Icon name={'bank-transfer-out'} color={color} size={size} />
            ),
            Earn: <Icon name={'bank-transfer-in'} color={color} size={size} />,
          }[route?.name];
        },
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#424242',
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: '500',
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Spent" component={Home} />
      <Tab.Screen name="Earn" component={Home} />
    </Tab.Navigator>
  );
}

export default BottomTab;
