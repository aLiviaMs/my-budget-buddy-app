import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../../@core/contexts/Auth';

function HomeScreen(): React.JSX.Element {
  const { signOut } = useAuth();

  return (
    <View>
      <Text style={{ color: '#000' }}>Home!</Text>
      <Button title="teste" onPress={() => signOut()} />
    </View>
  );
}

export default HomeScreen;
