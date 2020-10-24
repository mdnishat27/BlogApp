import {AsyncStorage} from 'react-native';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    alert('Data Stored Successfully!');
  } catch (error) {
    alert(error);
  }
};

const storeDataJSON = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    alert('Data STored Successfully!');
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
    alert('Data Added Successfully!');
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
      alert('No data with this key!');
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
      alert('No data with this key!');
    }
  } catch (error) {
    alert(error);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    alert('Data Removed Successfully');
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
};
