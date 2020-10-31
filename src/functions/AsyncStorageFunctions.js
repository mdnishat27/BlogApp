import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    ToastAndroid.show('Data Stored Successfully!', ToastAndroid.SHORT);
  } catch (error) {
    alert(error);
  }
};

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    ToastAndroid.show('Data Stored Successfully!', ToastAndroid.SHORT);
  } catch (error) {
    alert(error);
  }
};

const addDataJSON = async (key, value) => {
  try {
    let val = await AsyncStorage.getItem(key);
    val = JSON.parse(val);
    val.push(value);
    const jsonValue = JSON.stringify(val);
    await AsyncStorage.setItem(key, jsonValue);
    ToastAndroid.show('Data Added Successfully!', ToastAndroid.SHORT);
  } catch (error) {
    alert(error);
  }
};

const mergeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
    ToastAndroid.show('Data merged Successfully!', ToastAndroid.SHORT);
  } catch (error) {
    alert(error);
  }
};

const getData = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      return data;
    } else {
      ToastAndroid.show('No data with this key!', ToastAndroid.SHORT);
    }
  } catch (error) {
    alert(error);
  }
};

const getDataJSON = async (key) => {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data != null) {
      const jsonData = JSON.parse(data);
      return jsonData;
    } else {
      ToastAndroid.show('No data with this key!', ToastAndroid.SHORT);
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    ToastAndroid.show('Data Removed Successfully', ToastAndroid.SHORT);
  } catch (error) {
    alert(error);
  }
};

export {
  storeData,
  storeDataJSON,
  getData,
  getDataJSON,
  removeData,
  addDataJSON,
  mergeDataJSON,
};
