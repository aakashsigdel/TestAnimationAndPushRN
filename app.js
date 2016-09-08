import React, { PropTypes, Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FCM from 'react-native-fcm'

class App extends Component {
  componentDidMount() {
    console.log('Open from Notif')
    console.log(FCM.initialData)
    console.log('=====================')

    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
      fetch('http://192.168.0.107:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Aakash Android S7',
          deviceToken: token
        })
      })
      .then(response => response.json())
      .then(console.log)
      .catch(err => console.log('error aakash', err))
      console.log('first')
      // store fcm token in your server
    });
    this.notificationUnsubscribe = FCM.on('notification', (notif) => {
      // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
      console.log(notif)
    });
    this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
      console.log(token)
      console.log('second')
      // fcm token may not be available on first load, catch it here
    });

    FCM.subscribeToTopic('/topics/foo-bar');
    FCM.unsubscribeFromTopic('/topics/foo-bar');
  }

  componentWillUnmount() {
    // prevent leaking
    this.refreshUnsubscribe();
    this.notificationUnsubscribe();
  }

  render() {
    return (
      <Text style={{marginTop: 80}}>Hello There</Text>
    )
  }
}

export default App
