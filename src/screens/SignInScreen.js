import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Button, Card} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {AuthContext} from '../providers/AuthProvider';
import {getDataJSON} from '../functions/AsyncStorageFunctions';

const SignInScreen = (props) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <Card>
            <Card.Title>Welcome to My Blog!</Card.Title>
            <Card.Divider />
            <Input
              leftIcon={
                <FontAwesomeIcon name="envelope" size={24} color="black" />
              }
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
              icon={<FontAwesomeIcon name="sign-in" size={24} color="white" />}
              title="  Sign In"
              type="solid"
              onPress={async function () {
                let UserData = await getDataJSON(Email);
                if (UserData != undefined && UserData.password == Password) {
                  auth.setIsLoggedIn(true);
                  auth.setCurrentUser(UserData);
                } else {
                  alert('Login Failed');
                  //console.log(UserData);
                }
              }}
            />
            <Button
              type="clear"
              icon={<AntDesign name="adduser" size={24} color="dodgerblue" />}
              title="  Don't have an account?"
              onPress={function () {
                props.navigation.navigate('SignUp');
              }}
            />
          </Card>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#4bacb8',
  },
});

export default SignInScreen;
