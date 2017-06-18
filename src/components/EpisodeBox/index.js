/**
 * Created by fiddlest on 3/12/2017.
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

const Title = styled.Text`
  font-size: 18;
  font-weight: bold;
  color: black;
  marginBottom: 10
`;

const EpisodeBox = ({width, height, episode, handleClick}) => {
  return (
    <TouchableNativeFeedback style={[styles.episodeBox, {height: 100, width: width}]} onPress={handleClick(episode)}>
      <View style={{flex:1, flexDirection: 'row'}}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: episode.thumbnail_url, width: 120, height: 99}}/>
        </View>
        <View style={styles.detailContainer}>
          <Title>{episode.episode_title}</Title>
          <Text>{episode.rating}</Text>
          <Text>{moment(episode.uploaded_at).format('YYYY-MM-DD')}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  )
};


const styles = StyleSheet.create({
  episodeBox: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  imageContainer: {
    flex: 0.2,
  },
  image: {
    resizeMode: 'stretch'
  },
  detailContainer: {
   /* backgroundColor:'blue',*/
    flexDirection: 'column',
    flex: 0.35,
    paddingTop: 10
  },
});

export default EpisodeBox;