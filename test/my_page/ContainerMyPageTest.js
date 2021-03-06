import expect from 'expect'
import React from 'react'

import {mapDispatchToProps, mapStateToProps} from '../../src/js/my_page/ContainerMyPage'
import * as actions from '../../src/js/actions/AuthenticationActions'
import * as restaurantActions from '../../src/js/actions/RestaurantActions'

describe('ContainerMyPage', () => {
  it('mapsDispatchToProps for logout', () => {
    let dispatch = expect.createSpy()

    var spy = expect.spyOn(actions, 'logout')
    mapDispatchToProps(dispatch).logout()
    expect(spy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(actions.logout())
  })

  it('mapDispatchToProps for fetchRestaurants', () => {
    let dispatch = expect.createSpy()

    var spy = expect.spyOn(restaurantActions, 'fetchRestaurants')
    mapDispatchToProps(dispatch).fetchRestaurants()
    expect(spy).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(restaurantActions.fetchRestaurants())
  })

  it('mapStateToProps for myRestaurants', () => {
    let state = {
      restaurants: [
        {id: 0, name: 'Afuri', user: {id: 17}},
        {id: 1, name: 'Butagumi', user: {id: 18}}
      ],
      currentUser: {id: 17}
    }
    expect(mapStateToProps(state).myRestaurants).toEqual(
      [{id: 0, name: 'Afuri', user: {id: 17}}]
    )
  })

  it('mapStateToProps for myLikedRestaurants', () => {
    let state = {
      restaurants: [
        {id: 0, name: 'Afuri', liked: true, user: {id: 17}},
        {id: 1, name: 'Butagumi', liked: false, user: {id: 17}}
      ],
      currentUser: {id: 17}
    }
    expect(mapStateToProps(state).myLikedRestaurants).toEqual(
      [{id: 0, name: 'Afuri', liked: true, user: {id: 17}}]
    )
  })

  it('mapStateToProps for currentUser', () => {
    let state = {
      restaurants: [],
      currentUser: {id: 17}
    }
    expect(mapStateToProps(state).currentUser).toEqual(
      {id: 17}
    )
  })
})
