/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {requestReadPermission, requestWritePermission} from 'utils/permissionRequest';


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

  componentDidMount() {
    requestReadPermission();
    requestWritePermission();
  }
  render() {
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
