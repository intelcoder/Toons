const initState = {
  site: 'naver',
  selectedWebtoon: '',
  selectedEpisodes: '',
  webtoons: [],
  episodes: [],
  toonImages: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SITE_CHANGED':
      return { ...state, ...payload }

    case 'WEBTOON_SELECTED':

    case 'EPISODE_SELECTED':

    case 'WEBTOON_UPDATED':

    case 'EPISODE_UPDATED':

    case 'TOON_IMAGES':
  }
  return state
}
