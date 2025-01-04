import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuthStore} from './src/store/authStore';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import Layout from './src/components/Layout';

const Stack = createNativeStackNavigator();

export const App = () => {
  const {isLoggedIn, loading, loadToken} = useAuthStore();

  useEffect(() => {
    loadToken();
  }, [loadToken]);

  if (loading) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <Layout>
      <Stack.Navigator id={undefined}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </Layout>
  );
};

export default App;
