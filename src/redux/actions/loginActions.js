/**
 * Created by fiddlest on 2/27/2017.
 */
import secret from '../../config/secret';
import {loginTypes} from '../types'

const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAIL} = loginTypes
/**
 * This action will check if user already requested token
 * If not it calls fetchToken function to  get token
 * @param requestDetail Fetch detail
 * @returns {function(*, *)}
 */
export const loginReqeust = (id, pwd) => {
  return {
    type: LOGIN_REQUESTED,
    payload: {
      id: id,
      pwd: pwd
    }
  }
};

/**
 * This action will be fired when token successfully received
 * @param tokenInfo
 * @returns {{type: string, data: null}}
 */
export const tokenReceived = (tokenInfo) => {
  return {
    type: LOGIN_SUCCESS,
    data: tokenInfo ? tokenInfo : null
  }
};

/**
 * This action will be fired on request fail
 * @param err error msg from request
 * @returns {{type: string, error: *}}
 */
export const requestFail = (err) => {
  return {
    type: LOGIN_FAIL,
    error: err
  }
};

/**
 * This function calls requestToken, tokenReceived, and requestFail on different condition
 * @param requestDetail Fetch request detail( methods, headers, body }
 * @returns {function(*)}
 */
const fetchToken = (requestDetail) => {
  return (dispatch ) => {
    dispatch(requestToken());
    return fetch(secret.tokenUrl, requestDetail)
      .then(response => {
        return response.json();
      })
      .then(response => {
        if(response.error){
          return dispatch(requestFail('Login Failed with: ' + response.error_description));
        }
        if(response) dispatch(tokenReceived(response));

      })
      .catch(err => {
        dispatch(requestFail(err));
      })
  }
};
