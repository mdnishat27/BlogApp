import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Button, Text, Avatar} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';

function PostCard(props) {
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
          title="    Comment    "
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
