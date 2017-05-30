/**
 * Created by fiddlest on 2/24/2017.
 */
import {Dimensions} from 'react-native';

export const vw = percentageWidth =>  {
  return Dimensions.get('window').width * (percentageWidth / 100);
};

export const vh = percentageHeight => {
  return Dimensions.get('window').height * (percentageHeight / 100);
};



export const flex = (direction = 'row', justifyContent = 'initial', alignItem = 'initial') => {
  return {
    flex: 1,
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItem
  }
};

export const flexCenter = (direction = 'row') => {
  return {
    flex: 1,
    flexDirection: direction,
    justifyContent: 'center',
    alignItems: 'center'
  }
};
