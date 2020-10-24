import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text, Card, Button, Avatar, Input} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';
import CommentCard from '../components/CommentCard';
import {
  addDataJSON,
  getDataJSON,
  storeDataJSON,
} from '../functions/AsyncStorageFunctions';

const PostScreen = (props) => {
  //console.log(props.route.params);
  let info = props.route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [postcomments, setPostComments] = useState([]);

  const loadComments = async () => {
    let allcomments = await getDataJSON('Comments');
    setComments(allcomments);
    setPostComments(
      allcomments.filter(
        (el) => el.postid == info.user.email + info.currenttime,
      ),
    );
  };

  useEffect(() => {
    loadComments();
  }, []);

  const Loadpost = (auth) => {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          borderRadius: 10,
          borderBottomWidth: 20,
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderTopWidth: 10,
          borderColor: 'transparent',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            containerStyle={{backgroundColor: '#ffab91'}}
            rounded
            icon={{name: 'user', type: 'font-awesome', color: 'black'}}
            activeOpacity={1}
          />
          <Text h4Style={{padding: 10}} h4>
            {info.user.name}
          </Text>
        </View>
        <Text style={{fontStyle: 'italic'}}> {info.time}</Text>
        <Text>{'\n'}</Text>
        <Text
          style={{
            paddingVertical: 10,
          }}>
          {info.body}
        </Text>
        <Card.Divider />
        <Text
          style={{
            paddingVertical: 5,
            paddingBottom: 10,
          }}>
          17 Likes, 10 Comments.
        </Text>
        <Card.Divider />
        <Input
          placeholder="Write a comment"
          leftIcon={<Entypo name="pencil" size={20} color="black" />}
          onChangeText={function (currentInput) {
            setComment(currentInput);
          }}
        />
        <Button
          type="outline"
          title="Comment"
          onPress={function () {
            let newcomment = {
              postid: info.user.email + info.currenttime,
              user: auth.CurrentUser,
              time: 'Commented on ' + moment().format('DD MMM, YYYY'),
              body: comment,
            };
            if (postcomments == undefined) {
              setPostComments([newcomment]);
            } else {
              setPostComments([...postcomments, newcomment]);
            }

            if (comments == undefined) {
              setComments([newcomment]);
              storeDataJSON('Comments', [newcomment]);
            } else {
              setComments([...comments, newcomment]);
              addDataJSON('Comments', newcomment);
            }
          }}
        />
      </SafeAreaView>
    );
  };

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
            ListHeaderComponent={Loadpost(auth)}
            data={postcomments}
            renderItem={({item}) => {
              return (
                <CommentCard
                  name={item.user.name}
                  time={item.time}
                  comment={item.body}
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

export default PostScreen;
