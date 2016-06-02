import * as types from './constants/ActionTypes';
import fetch from 'isomorphic-fetch'
import { hashHistory } from 'react-router';

function requestRestaurants() {
    return {
        type: types.FETCH_RESTAURANTS_REQUEST
    }
}

function receiveRestaurants(json) {
    return {
        type: types.FETCH_RESTAURANTS_SUCCESS,
        restaurants: json
    }
}

function receiveSuggestions(json) {
    return {
        type: types.FETCH_SUGGESTIONS_SUCCESS,
        suggestions: json
    }
}

function receiveCuisineTypes(json) {
    return {
        type: types.FETCH_CUISINE_TYPES_SUCCESS,
        cuisineTypes: json
    }
}

function receivePriceRanges(json) {
    return {
        type: types.FETCH_PRICE_RANGES_SUCCESS,
        priceRanges: json
    }
}

function fetchRestaurantsWithUser() {
    return dispatch => {
        dispatch(requestRestaurants());

        return fetch(`${process.env.API_SERVER}/restaurants`, authorizationConfig())
            .then(response => response.json())
            .then(json => dispatch(receiveRestaurants(json)));
    }
}

function fetchSuggestionsWithUser(name) {
    return dispatch => {
        let config = Object.assign({}, authorizationConfig(),
          {method: "POST", body: JSON.stringify({restaurantName: name})}
        );

        return fetch(`${process.env.API_SERVER}/restaurant_suggestions`, config)
          .then(response => response.json())
          .then(json => dispatch(receiveSuggestions(json)));
    }
}

function fetchCuisineTypesWithUser() {
    return dispatch => {
        return fetch(`${process.env.API_SERVER}/cuisines`, authorizationConfig())
          .then(response => response.json())
          .then(json => dispatch(receiveCuisineTypes(json)))
    }
}


function fetchPriceRangesWithUser() {
    return dispatch => {
        return fetch(`${process.env.API_SERVER}/priceranges`, authorizationConfig())
          .then(response => response.json())
          .then(json => dispatch(receivePriceRanges(json)))
    }
}

function addNewRestaurantWithUser(name, address, cuisineId, priceRangeId) {
    return dispatch => {
        let config = Object.assign({}, authorizationConfig(),
          {
              method: "POST",
              body: JSON.stringify(
                {restaurant: {
                    name: name,
                    address: address,
                    cuisine_id: cuisineId,
                    price_range_id: priceRangeId,
                    photo_urls: []
                }}
              )
          })
        return fetch(`${process.env.API_SERVER}/restaurants`, config)
          .then(() => {
              hashHistory.push('/')
          })
    }
}

export function fetchRestaurants() {
    return dispatch => {
        if (token()) {
            return dispatch(fetchRestaurantsWithUser());
        } else {
            return dispatch(login(fetchRestaurantsWithUser));
        }
    }
}

export function fetchSuggestions(name) {
    return dispatch => {
        if (token()) {
            return dispatch(fetchSuggestionsWithUser(name));
        } else {
            return dispatch(login(fetchSuggestionsWithUser, name));
        }
    }
}

export function fetchCuisineTypes() {
    return dispatch => {
        if (token()) {
            return dispatch(fetchCuisineTypesWithUser())
        } else {
            return dispatch(login(fetchCuisineTypesWithUser()))
        }
    }
}

export function fetchPriceRanges() {
    return dispatch => {
        if (token()) {
            return dispatch(fetchPriceRangesWithUser())
        } else {
            return dispatch(login(fetchPriceRangesWithUser()))
        }
    }
}

export function addNewRestaurant(name, address, cuisineId, priceRangeId) {
    return dispatch => {
        if (token()) {
            return dispatch(addNewRestaurantWithUser(name, address, cuisineId, priceRangeId))
        } else {
            return dispatch(login(addNewRestaurantWithUser(name, address, cuisineId, priceRangeId)))
        }
    }
}

function login(nextAction, ...args) {
    let email = 'danny';
    let password = 'danny';
    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({email: email, password: password})
    };

    return dispatch => {
        dispatch(requestRestaurants());
        return fetch(`${process.env.API_SERVER}/session`, config)
            .then(response => response.json())
            .then((json) => {
                localStorage.setItem('token', json.token);
                dispatch(nextAction(...args));
            })
    }
}

function authorizationConfig() {
    return {
        headers: {
            'Authorization': `Bearer ${token()}`,
            'Content-Type':'application/json'
        }
    };
}

function token() {
    return localStorage.getItem('token');
}
