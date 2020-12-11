import React from 'react';
import {Header} from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

import {AuthContext} from '../providers/AuthProvider';

const HeaderHome = (props) => {
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: props.DrawerFunction,
          }}
          centerComponent={{
            text: 'My Blog',
            style: {fontSize: 20, color: '#fff'},
          }}
          rightComponent={{
            icon: 'logout',
            color: '#fff',
            onPress: function () {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                })
                .catch((error) => {
                  alert(error);
                });
            },
          }}
        />
      )}
    </AuthContext.Consumer>
  );
};

export default HeaderHome;
