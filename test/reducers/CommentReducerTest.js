import expect from 'expect'
import reducer from '../../src/js/reducers/CommentReducer'
import * as types from '../../src/js/constants/ActionTypes'
import * as commentReducer from '../../src/js/reducers/CommentReducer'

describe('CommentReducer', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('returns the comments the action is FETCH_COMMENTS_SUCCESS', () => {
    let comments = [
      {id: 0, comment: 'It is delicious'},
      {id: 1, comment: 'this is second comment'}
    ]
    let action = {
      type: types.FETCH_COMMENTS_SUCCESS,
      comments: comments
    }

    expect(commentReducer.comments(undefined, action)).toEqual(comments)
  })

  it('returns all comments with the added comment first when action is CREATE_COMMENT_SUCCESS', () => {
    let comment = {restaurant_id: 0, comment: 'i love it'}
    let addedComment = {restaurant_id: 0, comment: 'new comment'}
    let action = {
      type: types.CREATE_COMMENT_SUCCESS,
      comment: addedComment
    }
    let state = [comment]

    expect(commentReducer.comments(state, action)).toEqual([addedComment, comment])
  })
})