import React from 'react';
import { Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { ScrollView } from 'react-native-gesture-handler';

export default class AidScreen extends React.Component {
    async componentDidMount() {
        const soundObject = new Audio.Sound();
        this.soundObject = soundObject;
        try {
            console.log('Playing mounted');
            await soundObject.loadAsync(require('./images/stayinalive.mp3'));
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            console.log('Error playing sound: ', error);
            // An error occurred!
        }
    }

    async componentWillUnmount() {
        await this.soundObject.stopAsync();
    }

    state = {
        isPlaying: false,
    }
  
    render() {
      const { navigation } = this.props;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ScrollView>
            <TouchableOpacity onPress={() => this.setState({ isPlaying: !this.state.isPlaying })}>
                {!this.state.isPlaying ? <Image source={require('./images/playingSound.png')} style={{marginLeft: 25, marginTop: 80, marginBottom: 50, width: 300, height: 200}} /> 
                : <Image source={require('./images/pauseSound.png')} style={{marginLeft: 25, marginTop: 80, marginBottom: 50, width: 300, height: 200}} />}
            </TouchableOpacity>
            <Image source={require('./images/cpr-guide.jpg')} style={{marginBottom: 50, width: 350, height: 550}} />
            <Image source={require('./images/aed_1.jpg')} style={{marginLeft: 10, marginBottom: 50, width: 320, height: 500}} />
            <Image source={require('./images/aed_2.jpg')} style={{marginLeft: 20, marginBottom: 50, width: 300, height: 600}} />
          </ScrollView>          
          
        </View>
      );
    }
}
