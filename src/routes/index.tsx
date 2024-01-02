import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './RootStack';

function AppRoutes(): JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default AppRoutes;
