/**
 * Created by fiddlest on 5/22/2017.
 */
import React from 'react'
import { Platform, Text } from 'react-native'
import { connect } from 'react-redux'
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation'
import HomeScreen from 'Toons/src/screens/HomeScreen/HomeScreen'
import WebtoonScreen from 'Toons/src/screens/WebtoonScreen/WebtoonScreen'
import LoginScreen from 'Toons/src/screens/LoginScreen/LoginScreen'
import EpisodeScreen from 'Toons/src/screens/EpisodeScreen/EpisodeScreen'

export const AppNavigator = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Webtoon: {
      screen: WebtoonScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    Episode: {
      screen: EpisodeScreen,
    },
  },
  {
    mode: 'modal',
    cardStyle: { backgroundColor: 'white' },
    tintColor: '#ffffff',
  }
)

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

const mapStateToProps = state => {
  return {
    nav: state.nav,
  }
}

export default connect(mapStateToProps)(AppWithNavigationState)
