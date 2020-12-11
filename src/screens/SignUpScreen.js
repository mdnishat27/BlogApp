import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = (props) => {
  const [Name, setName] = useState('');
  const [SID, setSID] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  return (
    <View style={styles.viewStyle}>
      <Card>
        <Card.Title>Welcome to My Blog!</Card.Title>
        <Card.Divider />
        <Input
          leftIcon={<Fontisto name="person" size={24} color="black" />}
          placeholder="Name"
          onChangeText={function (currentInput) {
            setName(currentInput);
          }}
        />
        <Input
          leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
          placeholder="Student ID"
          onChangeText={function (currentInput) {
            setSID(currentInput);
          }}
        />
        <Input
          leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
          placeholder="E-mail Address"
          onChangeText={function (currentInput) {
            setEmail(currentInput);
          }}
        />

        <Input
          placeholder="Password"
          leftIcon={<Fontisto name="key" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={function (currentInput) {
            setPassword(currentInput);
          }}
        />

        <Button
          icon={<AntDesign name="adduser" size={24} color="white" />}
          title="  Sign Up!"
          type="solid"
          onPress={() => {
            if (Name != '' && SID != '' && Email != '' && Password != '') {
              firebase
                .auth()
                .createUserWithEmailAndPassword(Email, Password)
                .then((userCreds) => {
                  userCreds.user.updateProfile({displayName: Name});
                  firebase
                    .firestore()
                    .collection('users')
                    .doc(userCreds.user.uid)
                    .set({
                      name: Name,
                      sid: SID,
                      email: Email,
                    })
                    .then(() => {
                      console.log('account created');
                      alert(userCreds.user.uid);
                      props.navigation.navigate('SignIn');
                    })
                    .catch((error) => {
                      alert(error);
                    });
                })
                .catch((error) => {
                  alert(error);
                });
            }
          }}
        />
        <Button
          type="clear"
          icon={<FontAwesomeIcon name="sign-in" size={24} color="dodgerblue" />}
          title="  Already have an account?"
          onPress={function () {
            props.navigation.navigate('SignIn');
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4bacb8',
  },
});
export default SignUpScreen;
