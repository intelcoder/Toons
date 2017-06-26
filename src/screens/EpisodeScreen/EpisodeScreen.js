/**
 * Created by fiddlest on 3/19/2017.
 */
import React, { Component } from 'react'
import { View, Text, ListView, ToolbarAndroid, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import difference from 'lodash.difference'

import EpisodeList from 'components/EpisodeList'
import {createSelector} from 'reselect'
import secret from 'config/secret'
import { defaultModel } from 'models/model'
import { isTokenValid, extractValueFromObjArray } from 'utils'
import { saveEpisodeImage } from 'utils/saveImage'
import { getEpisodesDb, getEpisodesApi, episodeSelected } from 'redux/actions'
import {BasicSpinner} from 'components'
/*
 * if last uploaded time is diff save
 * */
@connect(state => ({
  isTokenValid: isTokenValid(state.login),
  episodes: state.webtoon.episodes,
  toonId: state.webtoon.selectedWebtoon,
  site: state.webtoon.site,
  isConnected: state.app.isConnected
}), (dispatch) => {
  return bindActionCreators({
      getEpisodesDb: getEpisodesDb,
      getEpisodesApi: getEpisodesApi,
      episodeSelected: episodeSelected
  }, dispatch)
})
export default class EpisodePage extends Component {

  //site:pk:ep - list of episode
  componentDidMount() {
    console.log(this.props)
    this.onLoad()
  }

  onLoad = async () => {
    const { site, toonId, isConnected, isTokenValid } = this.props
    const epBaseKey = [site, toonId, 'ep'].join(':')
    let episodeKeys = await defaultModel.getByKey(epBaseKey)

    console.log(episodeKeys)
    if (episodeKeys) {
      //assemble keys
      episodeKeys = episodeKeys.map(key => {
        return [epBaseKey, key].join(':')
      })
      return this.props.getEpisodesDb(episodeKeys)
    }
    //if (isTokenValid && isConnected) {
    if (isTokenValid) {
      this.props.getEpisodesApi(site, toonId, epBaseKey)
    }else {
      this.props.navigation.navigate('Login')
    }
  }

  handleClick =  (episode) => {
    return async () => {
      const { toonId, isTokenValid, isConnected } = this.props
      const toonImages = await defaultModel.getByKey(`webtoon:${toonId}:ep:${episode.no}:toon`)
   
      if(toonImages || isTokenValid) {
         this.props.episodeSelected(episode.no)
         return this.props.navigation.navigate('ToonView',{toonImageKeys: toonImages})
      }else {
         return this.props.navigation.navigate('Login' )
      }
    }
  }

  renderEpisodeList = ({width, height, episodes}) => {
    if(episodes.length > 0){
      return (
        <EpisodeList
              width={width}
              height={height}
              episodes={this.props.episodes}
              handleClick={this.handleClick}
        />
      )
    }
    return <BasicSpinner/>
  }

  render() {

    return (
      <View style={styles.episodeScreen}>
      {
        this.renderEpisodeList(this.props)
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  episodeScreen: {
    flex:1
  }
});