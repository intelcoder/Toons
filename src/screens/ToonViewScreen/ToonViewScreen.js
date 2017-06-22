/**
 * Created by fiddlest on 3/28/2017.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assembleUrl } from 'utils/index'
import { urlTypes } from 'models/data'
import Model from 'models/model'
import ToonListView from 'components/ToonListView'
import { saveToonImageToLocal } from 'utils/saveImage'
import { getToonImagesApi, getToonImageDb } from 'redux/actions'
import { View, Text, AsyncStorage } from 'react-native'
import { defaultModel } from 'models/model'
import { bindActionCreators } from 'redux'

@connect(state=>({
  toonImages: state.webtoon.toonImages,
  toonId: state.webtoon.selectedWebtoon,
  episodeNo: state.webtoon.selectedEpisodes
}),
(dispatch) => {
  return bindActionCreators({
      getToonImageDb: getToonImageDb,
  }, dispatch)
})
class ToonViewScreen extends Component {

  componentDidMount(){
    const {toonId, episodeNo} = this.props
    this.props.getToonImageDb(toonId, episodeNo)
  }
  render() {
    console.log(this.props)
    return (
      <View style={{ flex: 1 }}>
        {
          this.props.toonImages.length > 0 &&   <ToonListView toonImageList={this.props.toonImages} />
        }
      
      </View>
    )
  }
}

export default ToonViewScreen

ToonViewScreen.defaultProps = {
  toonId: '183559',
  episodeNo: '325',
}
