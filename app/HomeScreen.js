import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const io = require('socket.io-client');
const webhook = 'https://webhook.site/a8d20ff2-ff0b-4aa1-b9cd-1b6f3db41d21';

// Replace this URL with your own, if you want to run the backend locally!
const SocketEndpoint = 'http://e9dc4c18.ngrok.io';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }
  
  state = {
    isConnected: false,
    data: null,
    needHelp: false,
    aedCoordinate: {
      latitude: 43.6548,
      longitude: -79.3942
    },
    victimCoordinate: {
      latitude: 0.000,
      longitude: -79.3942
    },
  };
  componentDidMount() {
    const socket = io(SocketEndpoint, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('alert', data => {
      this.setState({ 
        data: data.time,
        needHelp: true,
        aedCoordinate: data.aed_coordinates,
        victimCoordinate: data.victim_coordinates,
      });
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
            {this.state.needHelp && <Marker coordinate={this.state.victimCoordinate} title={marker.title} image={require('./images/cross.png')} description="Suspected cardiac arrest" />}
            <Marker coordinate={this.state.aedCoordinate} title={aed.title} icon={require('./images/aed.png')} />
          </MapView>
        </View>
      </View>
    );
  }

  _showAlert = () => {
    //console.log('abc');
    Alert.alert(
      'Nearby casualty!',
      'Someone needs help! Ambulances are enroute. Please assist.',
      [
        { text: 'Acknowledge',
          onPress: () => {
            console.log('Ask me later pressed')
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: 'id=1&accepted=true'
            })
          }
        },
        {
          text: 'Let him/her die',
          onPress: () => {
            console.log('Cancel Pressed')
            fetch(webhook, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: 'id=1&accepted=false'
            })
          },
          style: 'cancel',
        },
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
  latitude: 43.649542,
  longitude: -79.392195,
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

const aed = {
  coordinate: {
    latitude: 43.6548,
    longitude: -79.3942
  },
  title: "AED",
}