import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { authAPI } from '../api/v1/AuthAPI';
import { ISignInDTO, ISignInResponseDTO } from '../common/DTOs';

interface AuthProviderProps {
  children: ReactNode;
}

interface IAuthContextData {
  auth?: ISignInResponseDTO,
  signIn: (data: ISignInDTO) => Promise<ISignInResponseDTO>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<ISignInResponseDTO>();

  async function signIn(data: ISignInDTO): Promise<ISignInResponseDTO> {
    // TODO: needs to add try/catch AND ASYNC STORAGE
    const response = await authAPI.signIn(data);
    setAuth(response);
    return response;
  }

  async function signOut(): Promise<void> {
    setAuth(undefined);
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



