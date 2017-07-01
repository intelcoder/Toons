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
import moment from 'moment'

import secret from 'Toons/src/config/secret'
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

export default class Login extends Component {
  state = {
    id: 'fiddlesticks',
    pwd: 'Tjdwns!@3',
  }
  handleOnPress = async () => {
    this.props.onPress(this.state.id, this.state.pwd)
  }
  handleIdInput = text => {
    if (text) this.setState({ id: text })
  }
  handlePwdInput = text => {
    if (text) this.setState({ pwd: text })
  }
  render() {
    /*const {width, height, login} = this.props;
      const {isFetching} = login;*/
    const { width, height } = Dimensions.get('window')
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
          <View style={{ alignItems: 'flex-end', padding: 10, marginTop: 20 }}>
            <Button
              block
              info
              onPress={this.handleOnPress}
              accessibilityLabel="Press to login"
            >
              <Text>Login</Text>

            </Button>
          </View>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: vh(8),
    alignItems: 'flex-end',
  },

  loginBtnContainer: {
    position: 'relative',
    width: vw(30),
    zIndex: 1,
    height: 40,
  },
  activityIndicatorContainer: {
    position: 'absolute',
    top: 0,
  },
})
