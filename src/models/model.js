/**
 * Created by fiddlest on 3/11/2017.
 */
import { AsyncStorage } from 'react-native'

const keys = {
  LIST: 'list',
  EPISODE: 'episode',
  TOON: 'toon',
}

//key: site - list of webtoon id
//key: site:pk - webtoon detail of webtoon
//key: site:pk:ep - list of episode
//key: site:pk:ep:no - ep detail
//key: site:pk:ep:no:toon
const model = () => {
  let state = {}
  return {
    save: save(state),
    getByKey: getByKey(state),
    getAllWithKeys: getAllWithKeys,
    setItems: setItems(state),
  }
}

const save = state => {
  return async (key, data) => {
    try {
      const jsonData = JSON.stringify(data)
      return AsyncStorage.setItem(key, jsonData)
    } catch (error) {
      return error
    }
  }
}

const getByKey = state => {
  return async key => {
    try {
      const data = await AsyncStorage.getItem(key)
      return JSON.parse(data)
    } catch (error) {
      return error
    }
  }
}

//[['key', 'value']]
const setItems = state => {
  return async (items, name = '') => {
    try {
      const stringifyItems = items.map(item => {
        return [item[0], JSON.stringify(item[1])]
      })
      return await AsyncStorage.multiSet(stringifyItems)
    } catch (e) {
      console.log('Set All fail' + name + ' ' + e)
    }
  }
}

const getAllWebtoonInSite = async (site, webtoonIds) => {
  const pWebtoons = webtoonIds.map(webtoonId => {
    const key = [site, webtoonId].join(':')
    return defaultModel.getByKey(key)
  })
  try {
    return await Promise.all(pWebtoons)
  } catch (e) {
    console.log('getAllWebtoonInSite error ', e)
  }
}

const getAllWithKeys = async keys => {
  if (keys) {
    const items = keys.map(key => {
      return defaultModel.getByKey(key)
    })
    try {
      return await Promise.all(items)
    } catch (e) {
      console.log('error occurred getAllWithKeys', e)
    }
  }
}

const isExist = async key => {
  const result = await AsyncStorage.getItem(key)
  return result !== null
}

export const defaultModel = model()

export default model
