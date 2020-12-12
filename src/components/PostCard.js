import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Text, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

function PostCard(props) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [islike, setIsLike] = useState(false);
  const [iconname, setIconname] = useState('like2');
  const isVisible = useIsFocused();

  const loadLikesComments = async () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(props.id)
      //.orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp_comments = [];
        let temp_likes = [];
        querySnapshot._data.comments.forEach((doc) => {
          //console.log(querySnapshot);
          temp_comments.push(doc);
        });
        querySnapshot._data.likes.forEach((doc) => {
          //console.log(querySnapshot);
          temp_likes.push(doc);
          if (doc.userid == props.user.uid) {
            setIsLike(true);
            setIconname('like1');
          }
        });
        setComments(temp_comments);
        setLikes(temp_likes);
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    loadLikesComments();
  }, [isVisible]);

  return (
    <Card>
      <View style={styles.viewStyle}>
        <Avatar
          containerStyle={{backgroundColor: '#ffab91'}}
          rounded
          icon={{name: 'user', type: 'font-awesome', color: 'black'}}
          activeOpacity={1}
        />
        <Text h4Style={{padding: 10}} h4>
          {props.author}
        </Text>
      </View>
      <Text style={{fontStyle: 'italic', fontSize: 10}}> {props.title}</Text>
      <Text
        style={{
          paddingVertical: 10,
          fontSize: 18,
        }}>
        {props.body}
      </Text>
      <Card.Divider />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          type="outline"
          title={'  Like (' + likes.length + ')'}
          icon={<AntDesign name={iconname} size={24} color="dodgerblue" />}
          onPress={async function () {
            if (islike) {
              firebase
                .firestore()
                .collection('posts')
                .doc(props.id)
                .update({
                  likes: firebase.firestore.FieldValue.arrayRemove({
                    userid: props.user.uid,
                    username: props.user.displayName,
                  }),
                })
                .then(() => {
                  setIsLike(false);
                  setIconname('like2');
                  console.log('unliked');
                })
                .catch((error) => {
                  alert(error);
                });

              if (props.user.uid != props.post.data.userId) {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(props.post.data.userId)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      type: 'unlike',
                      postid: props.id,
                      text: props.user.displayName,
                    }),
                  })
                  .then(() => {
                    console.log('notification created');
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
            } else {
              firebase
                .firestore()
                .collection('posts')
                .doc(props.id)
                .update({
                  likes: firebase.firestore.FieldValue.arrayUnion({
                    userid: props.user.uid,
                    username: props.user.displayName,
                  }),
                })
                .then(() => {
                  setIsLike(true);
                  setIconname('like1');
                  console.log('liked');
                })
                .catch((error) => {
                  alert(error);
                });
              //console.log(props.user.uid);
              //console.log(props.post.data.userId);
              if (props.user.uid != props.post.data.userId) {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(props.post.data.userId)
                  .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion({
                      type: 'like',
                      postid: props.id,
                      text: props.user.displayName,
                    }),
                  })
                  .then(() => {
                    console.log('notification created');
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
            }
          }}
        />
        <Button
          type="solid"
          title={'  Comment  (' + comments.length + ')  '}
          onPress={function () {
            //console.log(props.post);
            props.navigation.navigate('Post', props.post);
          }}
        />
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

export default PostCard;
