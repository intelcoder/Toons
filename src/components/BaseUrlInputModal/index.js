import React, { Component } from 'react'
import { Modal, Text, TouchableHighlight, View, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Input, Form, Button, Item, Label } from 'native-base'
import { baseUrlManager } from 'config/secret'
import { vw, vh, flex } from 'utils'
import { toggleBaseUrlModal } from 'redux/actions'

class BaseUrlInputModal extends Component {
  constructor(props) {
    super(props)
    console.log(' cont')
    this.state = {
      url: baseUrlManager.getUrl(),
      port: baseUrlManager.getPort(),
    }
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  handleBaseUrlChange = url => {
    this.setState({ url: url })
  }
  handlePortChange = port => {
    this.setState({ port: port })
  }
  handleSave = () => {
    baseUrlManager.setUrl(this.state.url)
    baseUrlManager.setPort(this.state.port)
    this.props.toggleBaseUrlModal()
  }
  render() {
    return (
      <View style={{ marginBottom: 20, position: 'absolute' }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.props.showMobile}
          onRequestClose={() => {}}
        >
          <View
            style={{
              ...flex('column', 'center', 'center'),
            }}
          >
            <Form style={{ width: vw(80) }}>
              <Item>
                <Label>Base Url:</Label>
                <Input
                  onChangeText={this.handleBaseUrlChange}
                  onSubmitEditing={Keyboard.dismiss}
                  value={this.state.url}
                />
              </Item>
              <Item>
                <Label>Port:</Label>
                <Input
                  onChangeText={this.handlePortChange}
                  onSubmitEditing={Keyboard.dismiss}
                  value={this.state.port}
                />
              </Item>
              <View
                style={{
                  width: vw(20),
                  marginTop: 10,
                  alignSelf: 'flex-end',
                }}
              >
                <Button
                  block
                  info
                  onPress={this.handleSave}
                  accessibilityLabel="Save Change"
                >
                  <Text>Save</Text>
                </Button>
              </View>
            </Form>
          </View>
        </Modal>
      </View>
    )
  }
}

export default connect(
  state => ({
    showMobile: state.app.showBaseUrlModal,
  }),
  dispatch => {
    return bindActionCreators(
      {
        toggleBaseUrlModal: toggleBaseUrlModal,
      },
      dispatch
    )
  }
)(BaseUrlInputModal)
