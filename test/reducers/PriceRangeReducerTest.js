import expect from 'expect'
import priceRangeReducer from '../../src/js/reducers/PriceRangeReducer'
import * as types from '../../src/js/constants/ActionTypes'

describe('PriceRangeReducer', () => {
  it('returns the price ranges when the action is FETCH_PRICE_RANGES_SUCCESS', () => {
    let priceRanges = [
      {id: 0, range: 'Not Specified'},
      {id: 1, range: '¥0~999'},
      {id: 2, range: '¥1000~1999'}
    ]
    let action = {
      type: types.FETCH_PRICE_RANGES_SUCCESS,
      priceRanges: priceRanges
    }

    expect(priceRangeReducer(undefined, action)).toEqual(priceRanges)
  })

  it('returns empty array by default', () => {
    expect(priceRangeReducer(undefined, {})).toEqual([])
  })
})
