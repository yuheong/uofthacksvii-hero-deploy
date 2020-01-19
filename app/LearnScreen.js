import React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default class LearnScreen extends React.Component {
    render() {
      const { navigation } = this.props;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView maximumZoomScale={5}>
            <Image source={require('./images/first_aid.jpg')} />
          </ScrollView>
        </View>
      );
    }
}
