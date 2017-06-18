/**
 * Created by fiddlest on 3/12/2017.
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  ListView,
  ToolbarAndroid,
  StyleSheet
} from 'react-native';
import EpisodeBox from 'components/EpisodeBox';

const styles = StyleSheet.create({
  episodeList: {}
});


export default class EpisodeList extends Component {
  state:{
    episodes: []
  };

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      episodes: this.ds.cloneWithRows(this.props.episodes)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.episodes !== nextProps.episodes) {
      this.setState({
        episodes: this.ds.cloneWithRows(nextProps.episodes)
      })
    }
  }

  render() {
    const {width, height, handleClick} = this.props;
    return (
      <View style={styles.episodeList}>
        <ListView
          dataSource={this.state.episodes}
          renderRow={(episode)=> {
            return (
              <EpisodeBox
                width={width}
                height={height}
                episode={episode}
                handleClick={handleClick}
              />

            )
          }}
        />
      </View>
    )
  }
}

