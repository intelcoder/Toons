/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {requestReadPermission, requestWritePermission} from 'utils/permissionRequest'
import {initTypes} from 'redux/types'


@connect((state) => ({
  login: state.login,
  init: state.init
}),
(dispatch) => {
  return bindActionCreators({
      startInit: () => ({
        type: initTypes.INIT_START
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
          title="Start init ~!!!!"
        />

          <Button
          onPress={() => {
            console.log('WebtoonScreen',this.props)
          }}
          title={this.props.init.status ? this.props.init.status : 'show me props' }
        />
      </View>
    )
  }
}

WebtoonScreen.navigationOptions = {
  title: 'Webtoon Screen',
}
export default WebtoonScreen
