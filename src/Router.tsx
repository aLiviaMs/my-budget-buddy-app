import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuth } from './app/@core/contexts/Auth';
import AppStack from './app/AppStack';
import AuthStack from './app/AuthStack';

export const Stack = createNativeStackNavigator();

export function Router() {
  const { auth } = useAuth();

  return (
    <NavigationContainer>
      {auth ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
