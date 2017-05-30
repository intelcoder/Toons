/**
 * Created by fiddlest on 5/22/2017.
 */

import {AppNavigator} from '../../navigators/AppNavigator/AppNavigator';

const homeAction = AppNavigator.router.getActionForPathAndParams('Login');
const initialState = AppNavigator.router.getStateForAction(homeAction);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};


export default navReducer;
