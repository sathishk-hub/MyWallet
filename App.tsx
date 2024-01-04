import React, {useEffect} from 'react';

import AppRoutes from './src/routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

function App(): JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1082683364531-i0bmfu74gq1ujm010t7t9nin1ugfepg9.apps.googleusercontent.com',
    });
  });
  return <AppRoutes />;
}

export default App;
