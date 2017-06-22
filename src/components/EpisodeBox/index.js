/**
 * Created by fiddlest on 3/12/2017.
 * @flow
 */
import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from 'react-native'
import moment from 'moment'

const EpisodeBox = ({ width, height, episode, handleClick }) => {
  return (
    <TouchableNativeFeedback
      style={[styles.episodeBox, { height: 100, width: width }]}
      onPress={handleClick(episode)}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'file://' + episode.thumbnail_url,
              width: 120,
              height: 99,
            }}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{episode.episode_title}</Text>
          <Text>{episode.rating}</Text>
          <Text>{moment(episode.uploaded_at).format('YYYY-MM-DD')}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
}

const styles = StyleSheet.create({
  episodeBox: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  imageContainer: {
    flex: 0.2,
  },
  image: {
    resizeMode: 'stretch',
  },
  detailContainer: {
    /* backgroundColor:'blue',*/
    flexDirection: 'column',
    flex: 0.35,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
})

export default EpisodeBox
