import expect from 'expect'
import suggestionReducer from '../../src/js/reducers/SuggestionReducer'
import * as types from '../../src/js/constants/ActionTypes';

describe('SuggestionReducer', () => {
  it('returns the list of suggestions when the action is FETCH_SUGGESTIONS_SUCCESS', () => {
    let suggestions = [
      {name: 'Afuri', address: 'Roppongi'},
      {name: 'Singaporean Chicken', address: 'Roppongi'}
    ]
    let action = {
      type: types.FETCH_SUGGESTIONS_SUCCESS,
      suggestions: suggestions
    }

    expect(suggestionReducer(undefined, action)).toEqual(suggestions)
  })

  it('returns empty array by default', () => {
    expect(suggestionReducer(undefined, {})).toEqual([])
  })
})
