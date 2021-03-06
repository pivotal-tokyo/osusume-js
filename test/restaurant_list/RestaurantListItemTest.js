import expect from 'expect'
import { shallow } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import RestaurantListItem from '../../src/js/restaurant_list/RestaurantListItem'
import placeholder from '../../src/images/placeholder.jpg'

describe('RestaurantListItem', () => {
  it('displays the restaurant passed in props', () => {
    let restaurant = {
      id: 0,
      name: 'Afuri',
      cuisine: {name: 'Ramen'},
      price_range: {range: '1000 - 2000'},
      address: 'Iidabashi West Exit',
      num_likes: 3,
      photo_urls: [{url: 'https://hoge/image.jpg'}],
      created_by_user_name: 'Kalle Anka',
      created_at: '2016-05-25T01:41:17.125Z',
      updated_at: '2016-05-26T10:03:17.736Z'
    }
    const component = shallow(<RestaurantListItem restaurant={restaurant} />)

    expect(component.find(Link).prop('to')).toEqual('/restaurants/0')
    expect(component.find('.name').text()).toEqual('Afuri')
    expect(component.find('.cuisine-and-price-range').text()).toEqual('Ramen | 1000 - 2000')
    expect(component.find('.number-likes').text()).toEqual('3 likes')
    expect(component.contains(<img className='photo' src='https://hoge/image.jpg'/>)).toBe(true)
    expect(component.find('.updated-at').text()).toEqual('5/26/2016')
  })

  it('displays placeholder when there are no photos', () => {
    let restaurant = {
      id: 0,
      name: 'Afuri',
      cuisine: {},
      price_range: {},
      photo_urls: []
    }

    const component = shallow(<RestaurantListItem restaurant={restaurant} />)

    expect(component.contains(<img className='photo' src={placeholder}/>)).toBe(true)
  })
})
