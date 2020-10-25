import React, {useState} from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {Text, Card, Button, Avatar, Header} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import prompt from 'react-native-prompt-android';
import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';
import Feather from 'react-native-vector-icons/Feather';

const ProfileScreen = (props) => {
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [work, setWork] = useState('');
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <>
            <View
              style={{
                flexDirection: 'column',
                padding: 20,
                alignItems: 'center',
              }}>
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
              <Button title={'Delete Profile'} />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                alignContent: 'space-around',
                flexDirection: 'row',
                borderColor: 'transparent',
                paddingVertical: 10,
              }}>
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
                        onPress: (birthdate) => setBirthdate(birthdate),
                      },
                    ],
                    {
                      placeholder: 'Enter your date of birth',
                    },
                  );
                }}
              />

              <Text style={styles.textStyle}>Born on : {birthdate}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                alignContent: 'space-around',
                flexDirection: 'row',
                borderColor: 'transparent',
                paddingVertical: 10,
              }}>
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
                        onPress: (newaddress) => setAddress(newaddress),
                      },
                    ],
                    {
                      placeholder: 'Enter your address',
                    },
                  );
                }}
              />

              <Text style={styles.textStyle}>Address : {address}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                alignContent: 'space-around',
                flexDirection: 'row',
                borderColor: 'transparent',
                paddingVertical: 10,
              }}>
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
                        onPress: (office) => setWork(office),
                      },
                    ],
                    {
                      placeholder: 'Enter your work space',
                    },
                  );
                }}
              />

              <Text style={styles.textStyle}>Works at, {work}</Text>
            </View>
          </>
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
});

export default ProfileScreen;
