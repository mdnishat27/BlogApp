import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Text, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

import {
  addDataJSON,
  getDataJSON,
  removeData,
  storeDataJSON,
} from '../functions/AsyncStorageFunctions';

function PostCard(props) {
  const [postcomments, setPostComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [islike, setIsLike] = useState(false);
  const [iconname, setIconname] = useState('like2');
  const isVisible = useIsFocused();

  const loadComments = async () => {
    let allcomments = await getDataJSON('Comments');
    if (allcomments != null) {
      setPostComments(
        allcomments.filter((el) => el.postid == props.post.postid),
      );
    } else {
      setPostComments([]);
    }
  };

  const loadLikes = async () => {
    let alllikes = await getDataJSON('Likes-' + props.post.postid);
    if (alllikes != null) {
      setLikes(alllikes);
      if (alllikes.some((item) => item.person == props.user.email)) {
        setIsLike(true);
        setIconname('like1');
      }
    } else {
      //setLikes([]);
    }
  };

  useEffect(() => {
    loadComments();
    loadLikes();
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
          {props.author.name}
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
            //await loadLikes();
            if (islike) {
              setIsLike(false);
              setIconname('like2');
              let newlikes = [];
              for (let obj of likes) {
                if (obj.person == props.user.email) {
                } else {
                  newlikes.push(obj);
                }
              }
              //console.log('new likes : ');
              //console.log(newlikes);
              if (newlikes.length > 0) {
                setLikes(newlikes);
                storeDataJSON('Likes-' + props.post.postid, newlikes);
              } else {
                //console.log('2');
                setLikes([]);
                removeData('Likes-' + props.post.postid);
              }
              //console.log(likes);
            } else {
              setIsLike(true);
              setIconname('like1');
              let likeobject = {
                person: props.user.email,
              };
              //console.log(likes);
              if (likes.length == 0) {
                setLikes([likeobject]);
                storeDataJSON('Likes-' + props.post.postid, [likeobject]);
              } else {
                setLikes([...likes, likeobject]);
                addDataJSON('Likes-' + props.post.postid, likeobject);
              }
              //console.log(likes);
              //console.log(likeobject);
            }
          }}
        />
        <Button
          type="solid"
          title={'  Comment  (' + postcomments.length + ')  '}
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
