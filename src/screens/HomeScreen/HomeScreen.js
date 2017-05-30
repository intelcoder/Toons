/**
 * Created by fiddlest on 5/22/2017.
 */
import React, {Component} from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form,Button, Item, Input,Label} from 'native-base';
class HomeScreen extends Component {
  render() {
    console.log("HomeScreen", this.props)
    return (

        <Container style={{background:'white'}}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
            </Form>
            <Button light block>
              <Text>Light</Text>
            </Button>
            <Button block>
              <Text>Primary</Text>
            </Button>
            <Button block success>
              <Text>Success</Text>
            </Button>
            <Button block info>
              <Text>Info</Text>
            </Button>
            <Button block warning>
              <Text>Warning</Text>
            </Button>
            <Button block danger>
              <Text>Danger</Text>
            </Button>
            <Button dark block>
              <Text>Dark</Text>
            </Button>

          </Content>
        </Container>

    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Home Screen'
};
export default HomeScreen;