import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Avatar} from 'react-native-elements';
import prompt from 'react-native-prompt-android';

import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';
import {mergeDataJSON, getDataJSON} from '../functions/AsyncStorageFunctions';

const ProfileScreen = (props) => {
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [work, setWork] = useState('');
  const user = useContext(AuthContext);

  const loadProfile = async () => {
    let profile = await getDataJSON(user.CurrentUser.email);
    setBirthdate(profile.birthdate);
    setAddress(profile.address);
    setWork(profile.work);
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
              {auth.CurrentUser.name}
            </Text>
            <Button title={' Delete Profile '} />
          </View>
          <View style={styles.profileitemViewStyle}>
            <Button
              type="outline"
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
                        mergeDataJSON(auth.CurrentUser.email, {
                          birthdate: birthdate,
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
              type="outline"
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
                        mergeDataJSON(auth.CurrentUser.email, {
                          address: newaddress,
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
              type="outline"
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
                        mergeDataJSON(auth.CurrentUser.email, {
                          work: office,
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
    fontSize: 25,
    color: 'black',
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
    paddingHorizontal: 10,
    alignContent: 'space-around',
    flexDirection: 'row',
    borderColor: 'transparent',
    paddingVertical: 10,
  },
});

export default ProfileScreen;
