import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Text, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';

import {getDataJSON} from '../functions/AsyncStorageFunctions';

function PostCard(props) {
  const [postcomments, setPostComments] = useState([]);
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

  useEffect(() => {
    loadComments();
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
          title="   Like    "
          icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
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
