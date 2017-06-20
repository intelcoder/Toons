/**
 * Created by fiddlest on 3/28/2017.
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assembleUrl } from 'utils/index'
import { urlTypes } from 'models/data'
import Model from 'models/model'
import WebtoonView from 'components/ToonListView'
import { saveToonImageToLocal } from 'utils/saveImage'

import { View, Text, AsyncStorage } from 'react-native'

type Props = {
  toonId: string,
  episodeNo: number,
}

class WebtoonImageListPage extends Component {
  state = {
    toonImageList: [],
  }
  model = Model()

  // fetchImageList = ({ dispatch, toonId, episodeNo, login }) => {

  //   const reqUrl = assembleUrl(urlTypes.TOONIMAGE, toonId, episodeNo)

  //   const fetchDetail = {

  //     method: 'GET',

  //     headers: {

  //       Authorization: login.tokenDetail.token_type.toLowerCase() +

  //         ' ' +

  //         login.tokenDetail.access_token,

  //     },

  //   }

  //   dispatch(fetchIfNeeded(reqUrl, fetchDetail))

  // }

  // site:pk:ep:no:toon
  componentWillMount() {
    const { toonId, episodeNo } = this.props

    //this.getImageListFromStorage(toonId, episodeNo)

    //this.fetchImageList(this.props)
  }

  getImageListFromStorage = (toonId, episodeNo) => {
    this.model
      .getByKey(`webtoon:${toonId}:ep:${episodeNo}:toon`)
      .then(toonList => {
        if (!toonList) {
          this.fetchImageList(this.props)
        } else {
          this.setState({
            toonImageList: toonList,
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
  saveImageListToStorage = async (toonId, episodeNo, data) => {
    let updatedData = data.map(toonImage => {
      return saveToonImageToLocal(toonImage, toonId, episodeNo)
    })
    updatedData = await Promise.all(updatedData)
    try {
      const saved = await this.model.save(
        `webtoon:${toonId}:ep:${episodeNo}:toon`,
        data
      )
      this.setState({
        toonImageList: updatedData,
      })
    } catch (e) {
      console.log('error occurred saving data', e)
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.fetchResult !== nextProps.fetchResult &&
      nextProps.fetchResult.data.length > 0
    ) {
      const { toonId, episodeNo } = nextProps

      this.saveImageListToStorage(toonId, episodeNo, nextProps.fetchResult.data)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.toonImageList.length > 0 &&
          <WebtoonView toonImageList={this.state.toonImageList} />}

      </View>
    )
  }
}

const mapStateToProps = (state): object => {
  const { loginReducer, fetchReducer } = state
  return {
    login: loginReducer,
    fetchResult: fetchReducer,
  }
}

export default connect(mapStateToProps)(WebtoonImageListPage)

WebtoonImageListPage.defaultProps = {
  toonId: '183559',
  episodeNo: '325',
}
