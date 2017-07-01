/**
 * Created by fiddlest on 3/2/2017.
 */
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, StyleSheet, ToolbarAndroid, AsyncStorage, ToastAndroid } from 'react-native'
import { TabViewAnimated, TabBar } from 'react-native-tab-view'
import { bindActionCreators } from 'redux'
import {updateSite, setWebtoonId, updateAllFav, activateLike, toggleBaseUrlModal} from 'redux/actions'
import ToonGird from 'components/ToonGrid'
import {BasicSpinner} from 'components'
import { siteList, pagerRoutes, weekdaysEng } from 'models/data'
import { defaultModel } from 'models/model'
import { isTokenValid } from 'utils'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'



@connect((state) => ({
  likeActivated: state.app.likeActivated,
  isTokenValid: isTokenValid(state.login),
  webtoons: state.webtoon.webtoons[state.webtoon.site],
  site: state.webtoon.site
}),
(dispatch) => {
  return bindActionCreators({
      updateSite: updateSite,
      setWebtoonId: setWebtoonId,
      updateAllFav: updateAllFav,
      activateLike: activateLike,
      toggleBaseUrlModal: toggleBaseUrlModal
  }, dispatch)
})
class WebtoonPager extends Component {
  state = {
    index: 0,
    routes: pagerRoutes,
    toolbarActions: [],
    favoriteSelected: [],
  }

  constructor(props){
    super(props)
  }
  _onActionSelected = position => {
    const {site} = this.props
    const actionTitle = toolbarActions[position].title.toLowerCase()
    if (siteList.indexOf(actionTitle) > -1 && site !== actionTitle) {
      //Turn off favorite selection mode
      this.setState({
        favoriteSelectActive: false,
      })
      this.props.updateSite(actionTitle)
    }
    if (actionTitle === 'like') {
      const { webtoons, site } = this.props
      const favorites = webtoons
        .filter(w => w.site == site && w.favorite)
        .map(w => w.toon_id)
      this.setState({
        favoriteSelected: [this.state.favoriteSelecte, ...favorites],
      })
      this.props.activateLike()
    }
    if(actionTitle === 'favsync'){
      //first get list of favorite webtoon
      
      ToastAndroid.show('Updating all the favorite Webtoons', ToastAndroid.LONG);
      this.props.updateAllFav()
    }
    if(actionTitle === 'login') {
        this.props.navigation.navigate('Login')
    }
    if(actionTitle === 'edit url'){
      this.props.toggleBaseUrlModal()
    }
  }
 
  _handleChangeTab = index => {
    this.setState({
      index,
    })
  }
  _renderHeader = props => {
    return <TabBar {...props} />
  }
  _renderScene = (
    { favoriteSelectActive },
    { webtoons, width, isFetching }
  ) => {
    return ({ index }) => {
      return (
        <ToonGird
          index={index}
          webtoons={webtoons.filter(
            webtoon => webtoon.weekday == weekdaysEng[index]
          )}
          width={width}
          favoriteSelectActive={favoriteSelectActive}
          isFetching={isFetching}
          handleCardClick={this.handleCardClick}
        />
      )
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const {site, webtoons} = this.props
    const { favoriteSelectActive } = this.state
    if (
      site !== nextProps.site ||
      webtoons !== nextProps.webtoons ||
      favoriteSelectActive !== nextState.favoriteSelectActive
    ) {
      return true
    }
    return false
  }

  handleCardClick = (toonId) => {
    const { likeActivated } = this.props
    if (!likeActivated && toonId) {
     this.props.setWebtoonId(toonId)
     this.props.navigation.navigate('Episode')
    
    } else if (likeActivated && toonId) {
      const index = this.state.favoriteSelected.indexOf(toonId)
      let selectedIds = []
      if (index < 0) selectedIds = this.state.favoriteSelected.concat(toonId)
      else selectedIds = this.state.favoriteSelected.filter(id => id !== toonId)
    
      this.setState({
        favoriteSelected: selectedIds,
      })
    }
  }
  setActions = site => {
    const actions = toolbarActions.filter(action => {
      if (site !== action.title.toLowerCase()) return action
    })
    this.setState({
      toolbarActions: actions,
    })
  }
  render() {
    const {site, webtoons} = this.props
    const isWebtoonExist = webtoons.length > 0
    return (
      <View
        style={{
          flex: 1,
        }}
    
      >
        <MaterialIcon.ToolbarAndroid
          title={site.toUpperCase()}
          style={{
            height: 56,
            backgroundColor: toolbarData[site.toLowerCase()].backgroundColor,
          }}
          onActionSelected={this._onActionSelected}
          titleColor="white"
          subtitleColor="white"
          actions={toolbarActions}
        />
        
        {!isWebtoonExist && <BasicSpinner/>}
        {
         isWebtoonExist &&
          <TabViewAnimated
            style={styles.container}
            navigationState={this.state}
            renderScene={this._renderScene(this.state, this.props)}
            renderHeader={this._renderHeader}
            onRequestChangeTab={this._handleChangeTab}
          />
        }

      </View>
    )
  }
}
WebtoonPager.defaultProps = {
  site: 'naver',
}
export default WebtoonPager

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const toolbarActions = [
  { title: 'Naver' },
  { title: 'Daum' },
  {
    title: 'FavSync',
    show: 'always',
    iconName: 'get-app'
  },
  {
    title: 'Like',
    show: 'always',
    iconName: 'favorite',
  },
  {
    title: 'Login',
    show: 'always',
    iconName: 'account-circle'
  },
    {
    title: 'Edit Url',
    show: 'always',
    iconName: 'mode-edit'
  }
]

const toolbarData = {
  naver: {
    site: 'Naver',
    backgroundColor: '#2DB400'
  },
  daum: {
    site: 'Daum',
    backgroundColor: '#E83D3D'
  },
  rezin: {
    site: 'Rezin',
    backgroundColor: '#E50020'
  },
  kakao: {
    site: 'Kakao',
    backgroundColor: '#F0CC18'
  }
}

