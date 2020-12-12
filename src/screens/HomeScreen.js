import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

import PostCard from './../components/PostCard';
import HeaderHome from './../components/Header';
import {AuthContext} from '../providers/AuthProvider';

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');
  const input = React.createRef();

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .orderBy('time', 'desc')
      .onSnapshot((querySnapshot) => {
        let temp_Posts = [];
        querySnapshot.forEach((doc) => {
          temp_Posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_Posts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert(error);
      });
  };

  useEffect(() => {
    loadPosts();
    //LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
          <Card>
            <Input
              ref={input}
              clearButtonMode={'always'}
              placeholder="What's On Your Mind?"
              leftIcon={<Entypo name="pencil" size={24} color="black" />}
              onChangeText={function (currentInput) {
                setPost(currentInput);
              }}
            />
            <Button
              title="Post"
              type="outline"
              onPress={function () {
                if (post != '') {
                  setLoading(true);
                  firebase
                    .firestore()
                    .collection('posts')
                    .add({
                      userId: auth.CurrentUser.uid,
                      user: auth.CurrentUser.displayName,
                      time: firebase.firestore.Timestamp.now(),
                      body: post,
                      likes: [],
                      comments: [],
                    })
                    .then((doc) => {
                      setLoading(false);
                      console.log('post created');
                      alert(doc.id);
                    })
                    .catch((error) => {
                      setLoading(false);
                      alert(error);
                    });
                  /*
                  let newpost = {
                    user: auth.CurrentUser,
                    time: moment().format('DD MMM, YYYY'),
                    postid:
                      auth.CurrentUser.email +
                      moment().format('YYYY-MM-DD hh:mm:ss a'),
                    body: post,
                  };
                  */
                }
                input.current.clear();
                setPost('');
              }}
            />
            <ActivityIndicator
              size={'large'}
              color={'red'}
              animating={loading}
            />
          </Card>
          <>
            <FlatList
              data={posts}
              renderItem={({item}) => {
                return (
                  <PostCard
                    id={item.id}
                    user={auth.CurrentUser}
                    author={item.data.user}
                    title={'Posted on ' + item.data.time.toDate()}
                    body={item.data.body}
                    navigation={props.navigation}
                    post={item}
                  />
                );
              }}
            />
          </>
        </ScrollView>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;
