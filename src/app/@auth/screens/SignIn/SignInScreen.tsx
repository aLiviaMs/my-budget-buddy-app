import React from 'react';
import {
  Button,
  Text,
  View,
} from 'react-native';
import { useAuth } from '../../../@core/contexts/Auth';

function SignInScreen(): React.JSX.Element {
  const { signIn } = useAuth();

  return (
    <View>
      <Text style={{ color: '#000' }}>SignInaaaaa</Text>
      <Button title="teste" onPress={() => signIn({email: 'e', password: '12346'})}/>
    </View>
  );
}

export default SignInScreen;
