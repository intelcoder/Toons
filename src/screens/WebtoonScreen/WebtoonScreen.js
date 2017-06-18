/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage,Dimensions } from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {requestReadPermission, requestWritePermission} from 'utils/permissionRequest'
import {INIT_START, FETCH_WEBTOON_DB} from 'redux/types'
import {updateSite, initStart} from 'redux/actions'
import {defaultModel} from 'models/model'
import {WebtoonPager} from 'components'

import { createSelector } from 'reselect'

@connect((state) => ({
  login: state.login,
  init: state.init,
  site: state.webtoon.site
}),
(dispatch) => {
  return bindActionCreators({
      startInit: initStart,
      updateSite: updateSite
  }, dispatch)
})
class WebtoonScreen extends Component {

  state = {
    width: 0,
    height: 0,
  }

   componentWillMount() {
    const {width, height} = Dimensions.get('window');
    this.setState({
      width: width,
      height: height
    });
  }
  componentDidMount() {
    requestReadPermission()
    requestWritePermission()

    this.initOrFetchStart();
  }

  initOrFetchStart = async () => {
    const {site} = this.props

    //Later on naver will be fetched from user config
    const naverToonIds = await defaultModel.getByKey(site)
    if(naverToonIds){
       this.props.updateSite(site)
    }else {
      this.props.startInit()
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <WebtoonPager 
          width={this.state.width}
          navigation={this.props.navigation}
        />
      </View>
    )
  }
}

WebtoonScreen.navigationOptions = {
  title: 'Webtoon Screen',
}
export default WebtoonScreen
