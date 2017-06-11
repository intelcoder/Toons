/**
 * Created by fiddlest on 3/4/2017.
 */

//@flow

import React, { Component, PropTypes } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class ToonCard extends Component {
  state = {
    favoriteSelected: this.props.favorite,
  }
  onClickHandler = () => {
    const { handleCardClick, toon_id, favoriteSelectActive } = this.props
    handleCardClick(toon_id)
    if (favoriteSelectActive) {
      this.setState({
        favoriteSelected: !this.state.favoriteSelected,
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    const { favoriteSelectActive } = this.props
    const { favoriteSelected } = this.state
    if (
      favoriteSelectActive !== nextProps.favoriteSelected ||
      favoriteSelected !== nextState.favoriteSelected
    )
      return true

    return false
  }

  render() {
    const {
      src,
      rating,
      author,
      title,
      width,
      height,
      favoriteSelectActive,
    } = this.props
    return (
      <TouchableOpacity
        onPress={this.onClickHandler}
        style={[styles.cardContainer, { width: width, height: height * 1.2 }]}
      >
        <View style={[styles.imageContainer]}>
          <View
            style={[
              styles.imageFilter,
              { opacity: favoriteSelectActive ? 1 : 0 },
            ]}
          >
            <Icon
              name="check-circle"
              size={18}
              color={this.state.favoriteSelected ? 'green' : 'grey'}
            />
          </View>
          <Image
            style={styles.cardImage}
            source={{ uri: 'file://' + src }}
            accessibilityLabel={title + ' 사진'}
          />
        </View>

        <View style={styles.textContainer}>
          <Text
          style={{flex:1}}
           numberOfLines={1}
           style={styles.title}
        
           >{title}</Text>
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
ToonCard.propTypes = {
  src: PropTypes.string.isRequired,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}
const styles = StyleSheet.create({
  cardContainer: {},
  imageContainer: {
    flex: 1,
  },
  cardImage: {
    flex: 1,
    resizeMode: 'stretch',
  },
  textContainer: {
    backgroundColor: '#f7f8f9',
    paddingBottom: 5,   
  },
  title: {
    marginTop: 3,
    fontWeight: 'bold',
  },
  rating: {
    color: 'red',
  },
  author: {
    color: '#666666',
  },
  imageFilter: {
    backgroundColor: 'white',
    right: 0,
    zIndex: 100,
    position: 'absolute',
    padding: 1,
  },
})
