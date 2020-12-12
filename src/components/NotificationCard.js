import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

function NotificationCard(props) {
  const [post, setPost] = useState('');

  //console.log(props);
  const loadPost = async () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(props.postid)
      .onSnapshot((querySnapshot) => {
        let data = {
          data: querySnapshot._data,
          id: props.postid,
        };
        setPost(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <Card>
      <View
        onStartShouldSetResponder={() =>
          props.navigation.navigate('Post', post)
        }
        style={styles.viewStyle}>
        <Avatar
          containerStyle={{backgroundColor: '#C8B560'}}
          rounded
          icon={props.icon}
          activeOpacity={1}
        />
        <Text style={{paddingHorizontal: 10}}>{props.notification}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NotificationCard;
