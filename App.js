import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator }    from 'react-native';
import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage      from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseConfig from './src/database/config.json';
import Authentication from './src/pages/auth/Authetication';
import Register       from './src/pages/register/Register';
import Dashboard      from './src/pages/client/home/Dashboard';
import Settings       from './src/pages/client/settings/Settings';
import Account        from './src/pages/client/settings/account/Account';
import Payment        from './src/pages/client/settings/payment/Payment';
import Address        from './src/pages/client/settings/address/Address';
import Search         from './src/pages/client/search/Search';
import Orders         from './src/pages/client/orders/Orders';
import Notifications  from './src/pages/client/notifications/Notifications';


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('auth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
      onAuthStateChanged(auth, (user) => {
        if (user || userToken) {
          setInitialRoute('home');
        }else {
          setInitialRoute('auth');
        }
        setLoading(false);
      });
    };

    checkUserStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
          name="home"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="account"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="payment"
          component={Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="address"
          component={Address}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications"
          component={Notifications}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;