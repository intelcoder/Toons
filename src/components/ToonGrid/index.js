/**
 * Created by fiddlest on 3/6/2017.
 */

import React, { Component, PropTypes } from 'react'
import { View, Text, Image, StyleSheet, ListView, Animated } from 'react-native'

import ToonCard from 'components/ToonCard/ToonCard'

export default class ToonGrid extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      dataSource: ds.cloneWithRows(this.props.webtoonList),
      fadeIn: new Animated.Value(0),
    }
    this.fadeIn = Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 0.6,
    })
  }

  componentWillUpdate(nextProps) {
    if (this.props.index !== nextProps.index) {
      this.setState({
        fadeIn: new Animated.Value(0),
      })
    }
    if (this.props.webtoonList !== nextProps.webtoonList) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 != r2,
      })
      this.setState({
        dataSource: ds.cloneWithRows(nextProps.webtoonList),
      })
      setTimeout(() => {
        this.fadeIn.start()
      }, 1000)
    }
  }

  render() {
    const { width, handleCardClick, favoriteSelectActive } = this.props
    return (
      <Animated.View
        style={{
          opacity: this.state.fadeIn,
        }}
      >
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
      </Animated.View>
    )
  }
}

ToonGrid.propTypes = {
  webtoonList: PropTypes.array,
  width: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleCardClick: PropTypes.func,
}

ToonGrid.defaultProps = {
  webtoonList: [
    {
      thumbnail_url: '',
      title: '',
      rating: 0,
      author: '',
    },
  ],
}
