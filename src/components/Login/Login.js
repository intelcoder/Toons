/**
 * Created by fiddlest on 2/23/2017.
 */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Keyboard,
  AsyncStorage,
  ToastAndroid,
} from 'react-native'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { vw, vh } from 'Toons/src/utils/styleHelper'
import {
  Container,
  Content,
  Form,
  Button,
  Item,
  Input,
  Label,
  Spinner,
} from 'native-base'
import Icon from 'react-native-vector-icons/SimpleLineIcons'

class Login extends Component {
  state = {
    id: 'fiddlesticks',
    pwd: 'Tjdwns!@3',
  }
  handleOnPress = () => {
    this.props.onPress(this.state.id, this.state.pwd)
  }
  handleIdInput = text => {
    if (text) this.setState({ id: text })
  }
  handlePwdInput = text => {
    if (text) this.setState({ pwd: text })
  }
  render() {
    return (
      <Container>
        <Content>
          <View
            style={{ display: 'flex', alignItems: 'center', marginTop: vw(20) }}
          >
            <Icon name="book-open" size={50} color="green" />
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={this.handleIdInput} />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                onChangeText={this.handlePwdInput}
                onSubmitEditing={Keyboard.dismiss}
              />
            </Item>
          </Form>
          <View style={styles.loginBtnContainer}>
            <Button
              block
              info
              style={{
                width: vw(30),
                alignSelf: 'flex-end'

              }}
              onPress={this.handleOnPress}
              accessibilityLabel="Press to login"
            >
              <Text>Login</Text>
            </Button>
            <Text style={styles.errorText}>{this.props.error}</Text>
          </View>

        </Content>
      </Container>
    )
  }
}

export default connect(state => ({...state.login}))(Login)

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: vh(8),
    alignItems: 'flex-end',
  },

  loginBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 10,
    marginTop: 20
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
  },
  errorText: {color: 'red', paddingTop: 5}
})
