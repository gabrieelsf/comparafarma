import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/pages/auth/Authetication'
import Register from './src/pages/register/Client'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="auth"
          component={Authentication}
        />
        <Stack.Screen
          name="register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App