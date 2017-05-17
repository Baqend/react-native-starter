import React, { Component } from 'react'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import createStore from './store/store'

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import { NativeRouter, Route, Link } from 'react-router-native'

import logo from './react_native_baqend.png'
import Messages from './components/Messages/Messages'
import Account from './components/Account/Account'

const store = createStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <Image source={logo} style={{ flex: 1, height: 80, resizeMode: "contain" }}  />
            </View>
            <View style={styles.nav}>
              <Link to="/" underlayColor='#f0f4f7' style={styles.navItem}>
                <Text>Chats</Text>
              </Link>
              <Link to="/account" underlayColor='#f0f4f7' style={styles.navItem}>
                <Text>Account</Text>
              </Link>
            </View>
            <Route exact path="/" component={Messages} />
            <Route path="/messages/:id" component={Messages}/>
            <Route path="/account" component={Account}/>
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  nav: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  navItem: {
    flex: 0,
    alignItems: 'center',
    padding: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
    marginBottom: 10
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    marginLeft: 10,
    flexGrow: 1,
  }
});
