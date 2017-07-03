import secret, { baseUrlManager } from 'app/config/secret'

import { ToastAndroid } from 'react-native'
import { createRequestUrl } from 'utils'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

export const fetchToken = async (id, pwd) => {
  const { clientId } = secret
  const requestDetail = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      client_id: clientId,
      grant_type: 'password',
      username: id,
      password: pwd,
    }),
  }
  const data = await fetch(baseUrlManager.getTokenUrl(), requestDetail)
  return data.json()
}

export const getToonRequest = async (requestUrl, tokenDetail) => {
  const { token_type, access_token } = tokenDetail
  const fetchDetail = {
    method: 'GET',
    headers: {
      Authorization: token_type.toLowerCase() + ' ' + access_token,
    },
  }
  try {
    const data = await fetch(requestUrl, fetchDetail)
    return data.json()
  } catch (e) {
    return ToastAndroid.show(
      `Error occurred on fetching ${requestUrl} data`,
      ToastAndroid.LONG
    )
  }
}
