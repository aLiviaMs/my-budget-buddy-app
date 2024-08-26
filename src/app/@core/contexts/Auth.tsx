// Libs
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';

// Models
import { environment } from '../../../../enviroment';
import { ISignInDTO } from '../common/DTOs';

// Services
import AsyncStorageService from '../services/StorageService';

// API
import { authAPI } from '../api/v1/AuthAPI';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  auth?: string,
  signIn: (data: ISignInDTO) => Promise<string>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<string>();

  useEffect(() => {
    loadFromStorage();
  }, []);

  async function loadFromStorage() {
    const response = await AsyncStorageService.getToken();

    if (response) {
      setAuth(response);
    }
  }

  async function signIn(data: ISignInDTO): Promise<any> {
    // TODO: Adds loading service

    try {
      const response = await authAPI.signIn(data);
      setAuth(response.accessToken);

      AsyncStorageService.setItem(environment.tokenKey, response.accessToken);

      return response;
    } catch (error) {
      Alert.alert('Credenciais inválidas, tente novamente');
      // TODO: create custom alert component and service
    }
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
    AsyncStorageService.removeItem(environment.tokenKey);
  }

  // Use useMemo to optimize the context value
  const contextValue = useMemo(() => ({
    auth,
    signIn,
    signOut,
  }), [auth]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}



