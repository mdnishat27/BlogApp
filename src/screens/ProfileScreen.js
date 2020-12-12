import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
import {Text, Button, Avatar} from 'react-native-elements';
import prompt from 'react-native-prompt-android';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';

const ProfileScreen = (props) => {
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [work, setWork] = useState('');
  const [sid, setSid] = useState('');

  const loadProfile = async () => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        //console.log(querySnapshot);
        setBirthdate(querySnapshot._data.birthdate);
        setAddress(querySnapshot._data.address);
        setWork(querySnapshot._data.work);
        setSid(querySnapshot._data.sid);
      })
      .then(() => {
        console.log('profile loaded');
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />

          <View style={styles.nameviewStyle}>
            <Avatar
              containerStyle={{backgroundColor: '#ffab91'}}
              rounded
              size={'xlarge'}
              icon={{
                name: 'user',
                type: 'font-awesome',
                color: 'black',
                size: 100,
              }}
              activeOpacity={1}
            />
            <Text style={{padding: 20, fontSize: 30}}>
              {auth.CurrentUser.displayName}
            </Text>
            <Button
              title={' Delete Profile '}
              onPress={function () {
                ToastAndroid.show('Coming soon...', ToastAndroid.SHORT);
              }}
            />
          </View>
          <Text style={styles.textStyle}>
            {'            '}
            Student id : {sid}
          </Text>
          <Text style={styles.textStyle}>
            {'            '}
            Email : {auth.CurrentUser.email}
          </Text>
          <View style={styles.profileitemViewStyle}>
            <Button
              type="clear"
              title={'Edit'}
              onPress={function () {
                prompt(
                  'Edit',
                  'Enter your date of birth',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: (birthdate) => {
                        setBirthdate(birthdate);
                        firebase
                          .firestore()
                          .collection('users')
                          .doc(auth.CurrentUser.uid)
                          .update({
                            birthdate: birthdate,
                          })
                          .then(() => {
                            console.log('birthday updated');
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      },
                    },
                  ],
                  {
                    placeholder: 'Enter your date of birth',
                  },
                );
              }}
            />

            <Text style={styles.textStyle}> Born on : {birthdate}</Text>
          </View>
          <View style={styles.profileitemViewStyle}>
            <Button
              type="clear"
              title={'Edit'}
              onPress={function () {
                prompt(
                  'Edit',
                  'Enter your address',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: (newaddress) => {
                        setAddress(newaddress);
                        firebase
                          .firestore()
                          .collection('users')
                          .doc(auth.CurrentUser.uid)
                          .update({
                            address: newaddress,
                          })
                          .then(() => {
                            console.log('address updated');
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      },
                    },
                  ],
                  {
                    placeholder: 'Enter your address',
                  },
                );
              }}
            />

            <Text style={styles.textStyle}> Address : {address}</Text>
          </View>
          <View style={styles.profileitemViewStyle}>
            <Button
              type="clear"
              title={'Edit'}
              onPress={function () {
                prompt(
                  'Edit',
                  'Where you work',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: (office) => {
                        setWork(office);
                        firebase
                          .firestore()
                          .collection('users')
                          .doc(auth.CurrentUser.uid)
                          .update({
                            work: office,
                          })
                          .then(() => {
                            console.log('office updated');
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      },
                    },
                  ],
                  {
                    placeholder: 'Enter your work space',
                  },
                );
              }}
            />

            <Text style={styles.textStyle}> Works at, {work}</Text>
          </View>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: 'black',
    paddingVertical: 5,
  },
  viewStyle: {
    flex: 1,
  },
  nameviewStyle: {
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
  profileitemViewStyle: {
    paddingHorizontal: 5,
    alignContent: 'space-around',
    flexDirection: 'row',
    borderColor: 'transparent',
  },
});

export default ProfileScreen;
