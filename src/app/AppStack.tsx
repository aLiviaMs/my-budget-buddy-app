import React from 'react';

import { Stack } from '../Router';
import HomeScreen from './screens/Home/HomeScreen';

export function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}


export default AppStack;
