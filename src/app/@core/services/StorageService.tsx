import AsyncStorage from '@react-native-async-storage/async-storage';
import { environment } from '../../../../enviroment';

type StorageKey = string;

interface AsyncStorageServiceInterface {
  setItem<T>(key: StorageKey, value: T): Promise<void>;
  getItem<T>(key: StorageKey): Promise<T | null>;
  removeItem(key: StorageKey): Promise<void>;
  getToken(): Promise<string | null>;
  setToken(value: string): Promise<void>;
}

const AsyncStorageService: AsyncStorageServiceInterface = {
  // Save an item to storage
  setItem<T>(key: StorageKey, value: T): Promise<void> {
    const jsonValue = JSON.stringify(value);
    return AsyncStorage.setItem(key, jsonValue);
  },

  // Retrieve an item from storage
  getItem<T>(key: StorageKey): Promise<T | null> {
    return AsyncStorage.getItem(key).then((jsonValue) => {
      return jsonValue ? (JSON.parse(jsonValue) as T) : null;
    });
  },

  // Remove an item from storage
  removeItem(key: StorageKey): Promise<void> {
    return AsyncStorage.removeItem(key);
  },

  getToken(): Promise<string | null> {
    return AsyncStorage.getItem(environment.tokenKey).then((jsonValue) => {
      return jsonValue ? JSON.parse(jsonValue) : null;
    });
  },

  setToken(value: string): Promise<void> {
    return AsyncStorage.setItem(environment.tokenKey, value);
  },
};

export default AsyncStorageService;
