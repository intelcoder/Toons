/**
 * Created by fiddlest on 5/24/2017.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import { View, Text, Button } from 'react-native'
import { bindActionCreators } from 'redux'

import {loginReqeust} from 'app/redux/actions/loginActions'
import Login from 'app/components/Login/Login'



@connect((state) => ({
  login: state.login
}),
(dispatch) => {
  return bindActionCreators({
      loginRequest:loginReqeust
  }, dispatch)
})
class LoginScreen extends Component {

  navigated = false

  handleOnPress = (id, pwd) => {
    const {isFetching} = this.props.login
    if(!isFetching){
      this.props.loginRequest(id, pwd)
    }
  }

  componentWillUpdate(nextProps){
    if(this.props.login !== nextProps.login){
      if(!this.navigated && nextProps.login.hasToken){
          this.props.navigation.navigate('Webtoon')
          this.navigated = true
      }
    }
  }

  render() {
    console.log(this.props)
    const {status} = this.props.login

    return (
      <View style={{flex: 1}}>
        <Login onPress={this.handleOnPress}/>
      </View>
    )
  }
}

LoginScreen.navigationOptions = {
  title: 'Login'
};
export default LoginScreen;
