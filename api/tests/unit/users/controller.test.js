const {registerUser} = require('../../../controller/usercontroller')

describe('registerUser', () => {
    test('should have a registerUser function', () => {
      expect(typeof registerUser).toBe('function')
    })

  })