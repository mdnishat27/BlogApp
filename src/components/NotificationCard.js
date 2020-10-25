import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-elements';
import {getDataJSON} from '../functions/AsyncStorageFunctions';

function NotificationCard(props) {
  const [post, setPost] = useState('');
  //console.log(props);
  const loadPost = async () => {
    let allpost = await getDataJSON('Posts');
    for (let a of allpost) {
      if (a.postid == props.postid) {
        setPost(a);
        break;
      }
    }
  };
  useEffect(() => {
    loadPost();
  }, []);

  return (
    <Card>
      <View
        onStartShouldSetResponder={() =>
          props.props.navigation.navigate('Post', post)
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar
          containerStyle={{backgroundColor: 'cyan'}}
          rounded
          icon={props.icon}
          activeOpacity={1}
        />
        <Text style={{paddingHorizontal: 10}}>{props.notification}</Text>
      </View>
    </Card>
  );
}

export default NotificationCard;
