import React from 'react';
import {View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-elements';

function CommentCard(props) {
  return (
    <Card>
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
        <Text h4Style={{paddingHorizontal: 10}} h4>
          {props.name}
        </Text>
      </View>
      <Text style={{fontStyle: 'italic', fontSize: 10, textAlign: 'right'}}>
        {props.time}
      </Text>
      <Card.Divider />
      <Text>{props.comment}</Text>
    </Card>
  );
}

export default CommentCard;
