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
import moment from 'moment';
import {SafeAreaView} from 'react-native-safe-area-context';
import uuid from 'uuid-random';

import {AuthContext} from '../providers/AuthProvider';
import HeaderHome from './../components/Header';
import CommentCard from '../components/CommentCard';
import {
  addDataJSON,
  getDataJSON,
  storeDataJSON,
} from '../functions/AsyncStorageFunctions';

const PostScreen = (props) => {
  //console.log('props');
  //console.log(props);
  let info = props.route.params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [postcomments, setPostComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const input = React.createRef();

  const loadComments = async () => {
    setLoading(true);
    let allcomments = await getDataJSON('Comments');
    setComments(allcomments);
    if (allcomments != null) {
      setPostComments(allcomments.filter((el) => el.postid == info.postid));
    } else {
      setPostComments([]);
    }
  };

  const loadNotifications = async () => {
    let allnotifications = await getDataJSON('Notifications');
    setNotifications(allnotifications);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
    loadNotifications();
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
                {info.user.name}
              </Text>
            </View>
            <Text style={{fontStyle: 'italic', fontSize: 12}}>
              {'  '}
              Posted on {info.time}
            </Text>
            <Text style={styles.textstyle}>{info.body}</Text>
            <Card.Divider />
            <Text style={{paddingBottom: 7}}>
              0 Likes, {postcomments.length} Comments.
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
              onPress={function () {
                if (comment != '') {
                  const commentid = uuid();
                  let newcomment = {
                    postid: info.postid,
                    commentid: commentid,
                    user: auth.CurrentUser,
                    time: moment().format('DD MMM, YYYY'),
                    body: comment,
                  };
                  const id = uuid();
                  let newnotification = {
                    notificationid: id,
                    type: 'comment',
                    author: auth.CurrentUser,
                    postid: info.postid,
                    postauthor: info.user,
                    text: auth.CurrentUser.name,
                  };
                  if (postcomments == undefined) {
                    setPostComments([newcomment]);
                  } else {
                    setPostComments([...postcomments, newcomment]);
                  }
                  //console.log(newnotification);
                  //console.log(newcomment);
                  if (comments == undefined) {
                    setComments([newcomment]);
                    storeDataJSON('Comments', [newcomment]);
                  } else {
                    setComments([...comments, newcomment]);
                    addDataJSON('Comments', newcomment);
                  }

                  if (notifications == undefined) {
                    setNotifications([newnotification]);
                    storeDataJSON('Notifications', [newnotification]);
                  } else {
                    setNotifications([...notifications, newnotification]);
                    addDataJSON('Notifications', newnotification);
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
            data={postcomments}
            inverted={true}
            scrollsToTop={true}
            keyExtractor={(item) => item.commentid}
            renderItem={({item}) => {
              return (
                <CommentCard
                  name={item.user.name}
                  time={'Commented on ' + item.time}
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
