/**
 * Created by fiddlest on 3/28/2017.
 */
import RNFetchBlob from 'react-native-fetch-blob'

const dirs = RNFetchBlob.fs.dirs
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'

export const saveToonImageToLocal = (toonImageObj, toonId, episodeNo) => {
  return RNFetchBlob.config({
    path: dirs.DocumentDir +
      `/${toonId}/${episodeNo}/${toonImageObj.order}.jpg`,
    appendExt: 'jpg',
  })
    .fetch('GET', toonImageObj.image_url, {
      Referer: 'http://comic.naver.com',
      'User-Agent': userAgent,
    })
    .then(res => {
      toonImageObj.image_url = res.path()
      return toonImageObj
    })
    .catch(e => {
      console.log(e, e.nativeEvent, 'error occurend during saving images')
    })
}

export const saveEpisodeImage = (toonId, episode) => {
  return RNFetchBlob.config({
    path: dirs.DocumentDir + `/${toonId}/episode/${episode.no}.jpg`,
    appendExt: 'jpg',
  })
    .fetch('GET', episode.thumbnail_url, {
      'User-Agent': userAgent,
    })
    .then(res => {
      episode.thumbnail_url = res.path()
      return episode
    })
    .catch(e => {
      console.log(e, e.nativeEvent, 'error occurend during saving images')
    })
}

export const saveThumbsToLocal = webtoon => {
  return RNFetchBlob.config({
    path: dirs.DocumentDir + `/${webtoon.site}/${webtoon.toon_id}.jpg`,
    'User-Agent': userAgent,
    appendExt: 'jpg',
  })
    .fetch('GET', webtoon.thumbnail_url, {})
    .then(res => {
      webtoon.thumbnail_url = res.path()
      return webtoon
    })
}
