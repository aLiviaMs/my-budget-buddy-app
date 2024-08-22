import { Stack } from 'expo-router';

export default function Layout() {
  // const { user } = useAuth();
  const user = false;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="screens/(authenticated)/home" />
      ) : (
        <Stack.Screen name="auth/signIn" />
      )}
    </Stack>
  );
}
