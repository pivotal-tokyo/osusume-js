import expect from 'expect'
import * as actions from '../../src/js/actions/AuthenticationActions'
import { mapDispatchToProps } from '../../src/js/login/ContainerLoginPage'

describe('ContainerLoginPage', () => {
  afterEach(function () {
    expect.restoreSpies()
  })

  it('mapDispatchToProps login', () => {
    let dispatch = expect.createSpy()
    let email = 'danny@pivotal.io'
    let password = 'password'
    var spy = expect.spyOn(actions, 'login')

    mapDispatchToProps(dispatch).login(email, password)
    expect(spy).toHaveBeenCalledWith(email, password)
    expect(dispatch).toHaveBeenCalledWith(actions.login())
  })
})
