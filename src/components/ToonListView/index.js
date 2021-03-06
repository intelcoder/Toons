/**
 * Created by fiddlest on 3/22/2017.
 */
import React, { Component } from 'react'

import {
  View,
  Text,
  Image,
  ScrollView,
  ListView,
  Dimensions,
} from 'react-native'
import AutoHeightImage from '../AutoHeightImage'

export default class WebtoonView extends Component {
  constructor(props) {
    super(props)
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })
    this.state = {
      dataSource: this.ds.cloneWithRows(this.getContents()),
    }
  }

  getContents = () => {
    const { width, height } = Dimensions.get('window')
    const { toonImageList } = this.props
    return toonImageList.map((toonImage, index) => {
      return (
        <AutoHeightImage
          key={toonImage.order + index}
          resizeMode={Image.resizeMode.contain}
          uri={'file://' + toonImage.image_url}
          width={width}
          height={height}

        />
      )
    })
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListView dataSource={this.state.dataSource} renderRow={d => d} />
      </View>
    )
  }
}
