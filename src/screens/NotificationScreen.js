import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import HeaderHome from './../components/Header';
import {AuthContext} from '../providers/AuthProvider';
import NotificationCard from '../components/NotificationCard';
import {getDataJSON} from '../functions/AsyncStorageFunctions';

const NotificationScreen = (props) => {
  //console.log(props);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext);

  const loadNotifications = async () => {
    setLoading(true);
    let allnotifications = await getDataJSON('Notifications');
    //console.log(user);
    if (allnotifications != undefined) {
      setNotifications(
        allnotifications.filter(
          (el) =>
            el.postauthor.email == user.CurrentUser.email &&
            el.author.email != user.CurrentUser.email,
        ),
      );
    }
    setLoading(false);
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
        keyExtractor={(item) => item.notificationid}
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
