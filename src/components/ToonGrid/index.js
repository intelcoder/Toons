/**
 * Created by fiddlest on 3/6/2017.
 */

import React, { Component, PropTypes } from 'react'
import { View, Text, Image, StyleSheet, ListView, Animated } from 'react-native'

import ToonCard from 'components/ToonCard'

export default class ToonGrid extends Component {
  constructor(props) {
    super(props)
   
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.webtoons),
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.webtoons !== nextProps.webtoons) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
      })
      this.setState({
        dataSource: ds.cloneWithRows(nextProps.webtoons),
      })
      
    }
  }

  render() {
    const { width, handleCardClick, favoriteSelectActive } = this.props
    return (
      <View>
        <ListView
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
          renderRow={data => (
            <ToonCard
              {...data}
              src={data.thumbnail_url}
              favoriteSelectActive={favoriteSelectActive}
              width={width / 3}
              height={width / 3}
              handleCardClick={handleCardClick}
            />
          )}
        />
      </View>
    )
  }
}

ToonGrid.propTypes = {
  webtoons: PropTypes.array,
  width: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleCardClick: PropTypes.func,
}

ToonGrid.defaultProps = {
  webtoons: [
    {
      thumbnail_url: '',
      title: '',
      rating: 0,
      author: '',
    },
  ],
}
