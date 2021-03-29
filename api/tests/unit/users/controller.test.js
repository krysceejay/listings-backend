const {registerUser} = require('../../../controller/usercontroller')

describe('registerUser', () => {
    it('should have a registerUser function', () => {
      expect(typeof registerUser).toBe('function')
    })

  })