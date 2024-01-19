import AppColors from '../utils/AppColors';
import AppSize from '../utils/AppSize';
import {ColorValue} from 'react-native';
import Earn from '../pages/Earn';
import Home from '../pages/Home';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../pages/Profile'
import React from 'react';
import {RootStackParams} from './RootStackParams';
import Spent from '../pages/Spent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootStackParams>();

const Icon = ({
  name,
  size = 30,
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
          const icons: {[key: string]: string} = {
            Home: 'home',
            Spent: 'bank-transfer-out',
            Earn: 'bank-transfer-in',
            Profile: 'face-man-profile',
          };

          return (
            <Icon
              name={icons[route.name].toString()}
              color={color}
              size={size}
            />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: AppColors.JapaneseLaurel,
        tabBarInactiveTintColor: AppColors.Arsenic,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 18,
          fontWeight: '500',
        },
        tabBarStyle:{
          paddingHorizontal:AppSize.hs(8)
        }
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Spent" component={Spent} />
      <Tab.Screen name="Earn" component={Earn} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomTab;
