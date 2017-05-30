import secret from 'app/config/secret'
import { createRequestUrl } from 'utils'

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

export const fetchToken = async (id, pwd) => {
  const { clientId, tokenUrl } = secret
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
  const data = await fetch(tokenUrl, requestDetail)
  return data.json()
}

export const getToonRequest = async (urlType, tokenDetail) => {
  const { token_type, access_token } = tokenDetail
  let requestUrl = createRequestUrl(urlType)
  console.log(requestUrl)
  const fetchDetail = {
    method: 'GET',
    headers: {
      Authorization: token_type.toLowerCase() + ' ' + access_token,
    },
  }
  console.log(requestUrl)
  const data = await fetch('http://192.168.2.92:9966/webtoon', fetchDetail)
  return data.json()
}
