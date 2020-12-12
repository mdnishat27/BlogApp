import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Text, Card, Button, Avatar, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';
import CommentCard from '../components/CommentCard';

const PostScreen = (props) => {
  //console.log('props');
  //console.log(props.route.params);
  let info = props.route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const input = React.createRef();

  const loadLikesComments = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .doc(info.id)
      //.orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp_comments = [];
        let temp_likes = [];
        querySnapshot._data.comments.forEach((doc) => {
          temp_comments.push(doc);
        });
        querySnapshot._data.likes.forEach((doc) => {
          temp_likes.push(doc);
        });
        setComments(temp_comments);
        setLikes(temp_likes);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadLikesComments();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <ScrollView style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <SafeAreaView style={styles.mainviewStyle}>
            <View style={styles.view2Style}>
              <Avatar
                containerStyle={{backgroundColor: '#ffab91'}}
                rounded
                icon={{name: 'user', type: 'font-awesome', color: 'black'}}
                activeOpacity={1}
              />
              <Text h4Style={{padding: 10}} h4>
                {info.data.user}
              </Text>
            </View>
            <Text style={{fontStyle: 'italic', fontSize: 12}}>
              {'  '}
              Posted on {new Date(info.data.time.toDate()).toString()}
            </Text>
            <Text style={styles.textstyle}>{info.data.body}</Text>
            <Card.Divider />
            <Text style={{paddingBottom: 7}}>
              {likes.length} Likes, {comments.length} Comments.
            </Text>
            <Card.Divider />
            <Input
              ref={input}
              clearButtonMode={'always'}
              placeholder="Write a comment"
              leftIcon={<Entypo name="pencil" size={20} color="black" />}
              onChangeText={function (currentInput) {
                setComment(currentInput);
              }}
            />
            <Button
              type="outline"
              title="Comment"
              onPress={async function () {
                if (comment != '') {
                  setLoading(true);
                  firebase
                    .firestore()
                    .collection('posts')
                    .doc(info.id)
                    .update({
                      comments: firebase.firestore.FieldValue.arrayUnion({
                        userid: auth.CurrentUser.uid,
                        username: auth.CurrentUser.displayName,
                        time: firebase.firestore.Timestamp.now(),
                        body: comment,
                      }),
                    })
                    .then(() => {
                      setLoading(false);
                      console.log('comment created');
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert(error);
                    });
                  //console.log(info.data.userId);
                  //console.log(auth.CurrentUser.uid);
                  if (auth.CurrentUser.uid != info.data.userId) {
                    setLoading(true);
                    firebase
                      .firestore()
                      .collection('users')
                      .doc(info.data.userId)
                      .update({
                        notifications: firebase.firestore.FieldValue.arrayUnion(
                          {
                            type: 'comment',
                            postid: info.id,
                            text: auth.CurrentUser.displayName,
                          },
                        ),
                      })
                      .then(() => {
                        setLoading(false);
                        console.log('notification created');
                      })
                      .catch((error) => {
                        setLoading(false);
                        alert(error);
                      });
                  }
                }
                input.current.clear();
                setComment('');
              }}
            />
            <ActivityIndicator
              size={'large'}
              color={'red'}
              animating={loading}
            />
          </SafeAreaView>

          <FlatList
            data={comments}
            inverted={true}
            scrollsToTop={true}
            keyExtractor={(item) => item.time.toString()}
            renderItem={({item}) => {
              return (
                <CommentCard
                  name={item.username}
                  time={
                    'Commented on ' + new Date(item.time.toDate()).toString()
                  }
                  comment={item.body}
                />
              );
            }}
          />
        </ScrollView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textstyle: {
    paddingVertical: 25,
    paddingBottom: 20,
    fontSize: 18,
  },
  view2Style: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewStyle: {
    flex: 1,
  },
  mainviewStyle: {
    flex: 1,
    borderRadius: 10,
    borderBottomWidth: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: 'transparent',
  },
});

export default PostScreen;
