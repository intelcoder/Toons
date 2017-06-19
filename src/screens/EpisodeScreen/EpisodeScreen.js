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
import { getEpisodesDb, getEpisodesApi } from 'redux/actions'

/*
 * if last uploaded time is diff save
 * */
@connect(state => ({
  isTokenValid: isTokenValid(state.login),
  episodes: state.webtoon.episodes,
  toonId: state.webtoon.selectedWebtoon,
  site: state.webtoon.site
}), (dispatch) => {
  return bindActionCreators({
      getEpisodesDb: getEpisodesDb,
      getEpisodesApi: getEpisodesApi
  }, dispatch)
})
export default class EpisodePage extends Component {

  //site:pk:ep - list of episode
  componentDidMount() {
    this.onLoad()
  }

  onLoad = async () => {
    const { site, toonId, isConnected, isTokenValid } = this.props
    const epBaseKey = [site, toonId, 'ep'].join(':')
    let episodeKeys = await defaultModel.getByKey(epBaseKey)
 
    if (episodeKeys) {
      //assemble keys
      episodeKeys = episodeKeys.map(key => {
        return [epBaseKey, key].join(':')
      })
      return this.props.getEpisodesDb( episodeKeys)
    }
    //if (isTokenValid && isConnected) {
    if (isTokenValid) {
      this.props.getEpisodesApi(toonId, epBaseKey)
    }
  }

  handleClick = episode => {
    return () => {
      const { toonId } = this.props
    }
  }
  getContents = episodes => {
    this.setState({
      episodeList: episodes,
    })
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
    return <Text> No item </Text>
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