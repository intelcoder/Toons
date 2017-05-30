/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'



@connect((state) => ({
  login: state.login
}),
(dispatch) => {
  return bindActionCreators({
      startInit: () => ({
        type: 'START_INIT'
      })
  }, dispatch)
})
class WebtoonScreen extends Component {
  testInitCall = () => {}
  render() {
    console.log(this.props)
    return (
      <View>
        <Text>Webtoon Screen</Text>
        <Button
          onPress={() => {
            this.props.startInit()
          }}
          title="Move to home2"
        />
      </View>
    )
  }
}

WebtoonScreen.navigationOptions = {
  title: 'Webtoon Screen',
}
export default WebtoonScreen
