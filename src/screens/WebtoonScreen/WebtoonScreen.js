/**
 * Created by fiddlest on 5/22/2017.
 */
import React, { Component } from 'react'
import { View, Text, Button, AsyncStorage, Dimensions, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  requestReadPermission,
  requestWritePermission,
} from 'utils/permissionRequest'
import { INIT_START, FETCH_WEBTOON_DB, INIT_SUCCESS } from 'redux/types'
import { updateSite, initStart, getCachedToken } from 'redux/actions'
import { defaultModel } from 'models/model'
import { WebtoonPager, BasicSpinner, BaseUrlInputModal } from 'components'
import { isTokenValid } from 'utils'
import { createSelector } from 'reselect'

@connect((state) => ({
  login: state.login,
  isInitializing: state.init.isInitializing,
  initStatus: state.init.status,
  site: state.webtoon.site,
  isFetching: state.webtoon.isFetching
}),
(dispatch) => {
  return bindActionCreators({
      startInit: initStart,
      updateSite: updateSite,
      getCachedToken: getCachedToken
  }, dispatch)
})
class WebtoonScreen extends Component {
  state = {
    width: 0,
    height: 0,
  }
  componentWillMount() {
    const { width, height } = Dimensions.get('window')
    this.setState({
      width: width,
      height: height,
    })
    this.getCachedToken()
  }

  getCachedToken = async () => {
    const token = await  defaultModel.getByKey('TOKEN')
    if(token && isTokenValid(token)){
      this.props.getCachedToken(token)
      return token
    }
  }

  componentDidMount() {
    requestReadPermission()
    requestWritePermission()
    this.initOrFetchStart()
  }

  initOrFetchStart = async () => {
    const token = await  defaultModel.getByKey('TOKEN')
    const { site } = this.props
    if(token && isTokenValid(token)){
      const naverToonIds = await defaultModel.getByKey(site)
      if (naverToonIds) {
        this.props.updateSite(site)
      } else {
        this.props.startInit()
      }
    }else {
      this.props.navigation.navigate('Login')
    }
    //Later on naver will be fetched from user config

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.initStatus === INIT_SUCCESS) {
      this.props.updateSite(nextProps.site)
    }
    if (
      nextProps.isInitializing &&
      this.props.initStatus !== nextProps.initStatus
    ) {
      ToastAndroid.show(nextProps.initStatus, ToastAndroid.SHORT);
    }
  }

  render() {
    const { isInitializing, isFetching } = this.props

    const shouldShowContents = (!isInitializing || !isFetching)
    
    return (
      <View style={{ flex: 1 }}>
        {
          !shouldShowContents && <BasicSpinner />
          
        }
        {
          shouldShowContents &&
          <WebtoonPager
            width={this.state.width}
            navigation={this.props.navigation}
          />  
        }

        <View style={{position: 'absolute', top:0}}>
        <BaseUrlInputModal />
        </View>
      </View>
    )
  }
}

WebtoonScreen.navigationOptions = {
  title: 'Webtoon Screen',
}
export default WebtoonScreen
