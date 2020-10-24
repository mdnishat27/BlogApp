import React, {useState, useEffect} from 'react';
import {ScrollView, View, StyleSheet, FlatList} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import moment from 'moment';

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

  const Inputcard = (auth) => {
    return (
      <Card>
        <Input
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
            let newpost = {
              user: auth.CurrentUser,
              time: 'Posted on ' + moment().format('DD MMM, YYYY'),
              body: post,
            };
            if (posts == undefined) {
              setPosts([newpost]);
              storeDataJSON('Posts', [newpost]);
            } else {
              setPosts([...posts, newpost]);
              addDataJSON('Posts', newpost);
            }
          }}
        />
      </Card>
    );
  };
  const loadPosts = async () => {
    setLoading(true);

    let allpost = await getDataJSON('Posts');
    setPosts(allpost);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <SafeAreaView style={styles.viewStyle}>
          <HeaderHome
            DrawerFunction={() => {
              props.navigation.toggleDrawer();
            }}
          />
          <FlatList
            ListHeaderComponent={Inputcard(auth)}
            data={posts}
            renderItem={({item}) => {
              return (
                <PostCard
                  author={item.user.name}
                  title={item.time}
                  body={item.body}
                />
              );
            }}
          />
        </SafeAreaView>
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

export default HomeScreen;
