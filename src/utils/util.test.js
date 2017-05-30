/**
 *
 * Created by fiddlest on 3/16/2017.
 */
import moment from 'moment';

import {isTokenExpired} from './index';

test("test token expire function",()=>{
    const cur = moment().unix();
    expect(isTokenExpired(cur, -100)).toBeTruthy();
    expect(isTokenExpired(cur, 20000)).toBeFalsy();
    expect(isTokenExpired(cur, 100)).toBeFalsy();
});

const getFieldFrom = (array, fieldName) => {
  return array.reduce((acc, item)=>{
    if(item[fieldName]) acc.push(item[fieldName]);
    return acc;
  }, [])
};
test("Test getFieldFrom", () => {
  const episodes = [
    {
      no: 123,
      title: '신의탑'
    },
      {
      no: 455654,
      title: 'MZ'
    },
      {
      no: 3452233,
      title: '마고'
    },
  ];
  expect(getFieldFrom(episodes, 'no')).toEqual([123,455654,3452233]);
  expect(getFieldFrom(episodes, 'title')).toEqual(['신의탑','MZ','마고']);
  expect(getFieldFrom(episodes, '')).toEqual([]);
});