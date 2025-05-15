import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Failed to save to storage:', e);
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to get from storage:', e);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to remove from storage:', e);
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Failed to clear storage:', e);
  }
};