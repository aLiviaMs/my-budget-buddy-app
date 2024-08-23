import React from 'react';

import { Stack } from '../Router';
import SignInScreen from './@auth/screens/SignIn/SignInScreen';

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}


export default AuthStack;
