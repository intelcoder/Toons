/**
 * Created by fiddlest on 7/2/2017.
 */
import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

export default class AutoHeightImage extends Component {
  constructor(props) {
    super(props);
    console.log( this.props.width)
    this.state = {source: {uri: this.props.uri,width: this.props.width }};
  }

  componentWillMount() {
    Image.getSize(this.props.uri, (width, height) => {

      this.setState({height: height / 2})
    })
  }

  render() {
    const {resizeMode} = this.props
    return (
      <Image
        resizeMode={resizeMode}
        source={this.state.source}
        style={{height: this.state.height, width: this.props.width}}
      />
    );
  }
}

AutoHeightImage.propTypes = {
  uri: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};