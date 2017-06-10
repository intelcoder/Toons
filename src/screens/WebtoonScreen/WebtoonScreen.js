/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {requestReadPermission, requestWritePermission} from 'utils/permissionRequest'
import {initTypes, webtoonsTypes} from 'redux/types'
import {defaultModel} from 'models/model'


@connect((state) => ({
  login: state.login,
  init: state.init
}),
(dispatch) => {
  return bindActionCreators({
      startInit: () => ({
        type: initTypes.INIT_START
      }),
      siteUpdate: (site) => ({
        type: webtoonsTypes.SITE_UPDATED,
        site: site
      })
  }, dispatch)
})
class WebtoonScreen extends Component {

  componentDidMount() {
    requestReadPermission()
    requestWritePermission()
    
    this.getSiteDataIfAvailable()

  }

  getSiteDataIfAvailable = async () => {
    const naverToonIds = await defaultModel.getByKey('naver')
    const naverToons = await defaultModel.getAllWebtoonInSite('naver', naverToonIds)
    console.log(naverToons)
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
