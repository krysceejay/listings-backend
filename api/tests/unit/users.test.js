const User = require('../../models/User')

describe('user.matchPassword', () => {
    it('should match user given password', async () => {
        const user = new User({
            _id: '6066ebaffc575e019fd0d74e',
            firstName: 'firstName2',
            lastName: 'lastName2',
            email: 'user2@gmail.com',
            password: '$2a$10$KuVhi4vFl.AvEiC84Y20B.5hkkHHbAZAVOMl1/BSrTXY4g0MqzM1m',
          })

        const matchPassword = await user.matchPassword('password2')

        expect(matchPassword).toBe(true)
    })
})