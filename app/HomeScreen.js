import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';

const io = require('socket.io-client');
const webhook = 'https://webhook.site/a8d20ff2-ff0b-4aa1-b9cd-1b6f3db41d21';

// Replace this URL with your own, if you want to run the backend locally!
const ngrok = 'http://e9dc4c18.ngrok.io'
const SocketEndpoint = 'https://swift-area-265607.appspot.com';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerShown: false
  }

  state = {
    isConnected: false,
    data: null,
    needHelp: false,
    aedCoordinate: {
      latitude: 43.6461039,
      longitude: -79.3886814
    },
    victimCoordinate: {
      latitude: 43.6458709,
      longitude: -79.3898179
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
          <Image source={require('./images/hero_deploy.png')} />
        </View>
        
        <View style={{ flex: 6 }}>
          <MapView provider={PROVIDER_GOOGLE} style={styles.mapStyle} initialRegion={toRegion} showsUserLocation={false}>
            <Marker coordinate={responderCoordinates} icon={require('./images/currlocation.png')} />
            {this.state.needHelp &&<Marker coordinate={this.state.victimCoordinate} title={marker.title} image={require('./images/cross.png')} description={marker.description} />}
            <Marker coordinate={this.state.aedCoordinate} title={aed.title} icon={require('./images/aed.png')} />
            {this.state.needHelp &&<Polyline coordinates={this.coords} strokeWidth={2} strokeColor="#5B80D8" strokeColors={[	'#7F0000', '#B24112',	'#E5845C', '#238C23' ]}/>}
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
        {
          text: 'Acknowledge',
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
          text: "Sorry, I can't make it.",
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

  coords = [
    { latitude: 43.645419, longitude: -79.389306 },
    { latitude: 43.645660, longitude: -79.388735 },
    this.state.aedCoordinate,
    this.state.victimCoordinate
  ]
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#d12f22',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 0,
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
  latitude: 43.642542,
  longitude: -79.391195,
  latitudeDelta: 0.016,
  longitudeDelta: 0.016,
}

const marker = {
  coordinate: {
    latitude: 43.6538,
    longitude: -79.3932
  },
  title: "42-year old Male",
  description: "Suspected cardiac arrest"
}

const aed = {
  title: "AED",
}

const responderCoordinates = { latitude: 43.645349, longitude: -79.389306 }