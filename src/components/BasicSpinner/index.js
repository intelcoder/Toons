/**
 * Created by fiddlest on 3/9/2017.
 */
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default class BasicSpinner extends Component {
  render() {
    const { type, size, customStyle, color, animating } = this.props
    return (
      <ActivityIndicator
        animating={animating}
        style={[styles.indicatorCenter, customStyle]}
        size={size}
        color={color}
      />
    )
  }
}

const styles = StyleSheet.create({
  indicatorCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  fullCenter: {
    flex: 1,
  },
})

BasicSpinner.defaultProps = {
  customStyle: {},
  size: 'large',
  color: 'black',
}
