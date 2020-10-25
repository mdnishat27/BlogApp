import React from 'react';
import {View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-elements';

function NotificationCard(props) {
  return (
    <Card>
      <View
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
