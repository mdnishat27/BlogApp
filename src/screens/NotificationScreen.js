import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import HeaderHome from './../components/Header';
import {AuthContext} from '../providers/AuthProvider';
import NotificationCard from '../components/NotificationCard';
import {getDataJSON} from '../functions/AsyncStorageFunctions';

const NotificationScreen = (props) => {
  //console.log(props);
  const [notifications, setNotifications] = useState([]);
  const user = useContext(AuthContext);

  const loadNotifications = async () => {
    let allnotifications = await getDataJSON('Notifications');
    //console.log(user);
    setNotifications(
      allnotifications.filter(
        (el) =>
          el.postauthor.email == user.CurrentUser.email &&
          el.author.email != user.CurrentUser.email,
      ),
    );
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    loadNotifications();
  }, [isFocused]);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <FlatList
            data={notifications}
            renderItem={({item}) => {
              return (
                <NotificationCard
                  props={props}
                  postid={item.postid}
                  icon={item.icon}
                  notification={item.text}
                />
              );
            }}
          />
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: 'blue',
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
