/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Dimensions } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/redux/store/store'
import AppNavigator from './src/navigators/AppNavigator/AppNavigator'

export default class Toons extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    )
  }
}

AppRegistry.registerComponent('Toons', () => Toons)
