import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {LogBox} from 'react-native';

import PostCard from './../components/PostCard';
import HeaderHome from './../components/Header';
import {AuthContext} from '../providers/AuthProvider';
import {
  getDataJSON,
  storeDataJSON,
  addDataJSON,
} from '../functions/AsyncStorageFunctions';

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState('');
  const input = React.createRef();

  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON('Posts');
    setPosts(allpost);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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
                  let newpost = {
                    user: auth.CurrentUser,
                    time: moment().format('DD MMM, YYYY'),
                    postid:
                      auth.CurrentUser.email +
                      moment().format('YYYY-MM-DD hh:mm:ss a'),
                    body: post,
                  };
                  if (posts == undefined) {
                    setPosts([newpost]);
                    storeDataJSON('Posts', [newpost]);
                  } else {
                    setPosts([...posts, newpost]);
                    addDataJSON('Posts', newpost);
                  }
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
              inverted={true}
              scrollsToTop={true}
              keyExtractor={(item) => item.postid}
              renderItem={({item}) => {
                return (
                  <PostCard
                    user={auth.CurrentUser}
                    author={item.user}
                    title={'Posted on ' + item.time}
                    body={item.body}
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
