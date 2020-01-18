import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const io = require('socket.io-client');

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = 'http://e9dc4c18.ngrok.io';

export default class App extends React.Component {
  state = {
    isConnected: false,
    data: null,
    needHelp: false,
  };
  componentDidMount() {
    const socket = io(SocketEndpoint, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('alert', data => {
      this.setState({ data: data.time, needHelp: true });
      this._showAlert();
      console.log(data);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Image source={require('./images/Hero_Logo.png')} />
        </View>
        <View style={styles.container}>
          <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text>
          {this.state.data &&
            <Text>
              ping response: {this.state.data}
            </Text>}
          <TouchableOpacity style={styles.button}
            onPress={this._showAlert}>
            <Text style={{ fontSize: 14, color: 'black' }}>Show Alert!</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 6 }}>
          <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} initialRegion={toRegion} showsUserLocation={true}>
            {this.state.needHelp && <Marker coordinate={marker.coordinate} title={marker.title} description="Suspected cardiac arrest" />}
          </MapView>
        </View>
      </View>
    );
  }

  _showAlert = () => {
    //console.log('abc');
    Alert.alert(
      'Alert Title',
      'Someone needs help!',
      [
        { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Let him/her die',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#d12f22',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const toRegion = {
  latitude: 43.6542,
  longitude: -79.3974,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
}

const marker = {
  coordinate: {
    latitude: 43.6538,
    longitude: -79.3932
  },
  title: "42-year old Male",
}