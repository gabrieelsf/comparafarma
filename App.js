import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/pages/auth/Authetication'
import Register       from './src/pages/register/Register'
import Dashboard      from './src/pages/client/Dashboard'
// import firebaseConfig from './src/database/config.json'
// import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

// const firebaseApp = initializeAuth(firebaseConfig, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="auth"
          component={Authentication}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App