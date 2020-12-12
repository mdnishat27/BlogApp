import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/auth';

import HeaderHome from './../components/Header';
import NotificationCard from '../components/NotificationCard';

const NotificationScreen = (props) => {
  //console.log(props);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      //.orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp_notifications = [];
        let count = 0;
        querySnapshot._data.notifications.forEach((doc) => {
          doc['id'] = count;
          //console.log(doc);
          temp_notifications.push(doc);
          count += 1;
        });
        setNotifications(temp_notifications);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    loadNotifications();
  }, [isFocused]);

  const geticon = (type) => {
    if (type == 'comment') {
      return {name: 'comment', type: 'font-awesome', color: 'green'};
    } else if (type == 'like') {
      return {name: 'like1', type: 'ant-design', color: 'blue'};
    } else {
      return {name: 'dislike1', type: 'ant-design', color: 'black'};
    }
  };

  const getext = (text, type) => {
    if (type == 'comment') {
      return text + ' commented on your post';
    } else if (type == 'like') {
      return text + ' liked your post';
    } else {
      return text + ' unliked your post';
    }
  };

  return (
    <ScrollView style={styles.viewStyle}>
      <HeaderHome
        DrawerFunction={() => {
          props.navigation.toggleDrawer();
        }}
      />

      <ActivityIndicator size={'large'} color={'red'} animating={loading} />

      <FlatList
        data={notifications}
        inverted={true}
        scrollsToTop={true}
        //keyExtractor={(item) => item.notificationid}
        renderItem={({item}) => {
          return (
            <NotificationCard
              navigation={props.navigation}
              postid={item.postid}
              icon={geticon(item.type)}
              notification={getext(item.text, item.type)}
            />
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
});

export default NotificationScreen;
