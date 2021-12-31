const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../../models/User')
const generateToken = require('../../utils/generateToken')
let server

describe('/api/v1/users', () => {
    let conn

    beforeAll(async () => {
        conn = await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
          })
    })

    afterAll(async () => {
        await conn.close()
    })

    beforeEach(() => { server = require('../../server')})
    afterEach(async () => { 
        server.close() 
        await User.deleteMany({})
    })

    describe('GET /', () => {
        it('should return 401 if user is not logged in', async () => {
            const res = await request(server).get('/api/v1/users')
            expect(res.status).toBe(401)
        })

        it('should return all users for admin', async () => {
            const user = await User.create({
                firstName: 'firstName', 
                lastName: 'lastName', 
                email: 'user@gmail.com', 
                password: 'password', 
                isAdmin: true, 
                emailVerified: true, 
                status: true
              })
            const token = generateToken(user._id)

            const res = await request(server)
                .get('/api/v1/users')
                .set('Authorization', `Bearer ${token}`)

            expect(res.status).toBe(200)
        })
    })

    describe('GET /:id', () => {
        it('should return 401 if user is not logged in', async () => {
            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
                isAdmin: true, 
                emailVerified: true, 
                status: true
            })
            await user.save()

            const res = await request(server)
                .get(`/api/v1/users/${user._id}`)
                
            expect(res.status).toBe(401)
        })
        it('should return a user with a valid id if user is logged in and an admin', async () => {
            
            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
                isAdmin: true, 
                emailVerified: true, 
                status: true
            })
            await user.save()
            const token = generateToken(user._id)

            const res = await request(server)
                .get(`/api/v1/users/${user._id}`)
                .set('Authorization', `Bearer ${token}`)
                
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('email', user.email)
        })

        it('should return 404 if invalid id is passed', async () => {

            const res = await request(server).get(`/api/v1/users/1`)
            expect(res.status).toBe(404)
        })
    })

    describe('POST /', () => {
        it('should register a user', async () => {
            const user = {
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            }

            const res = await request(server)
                .post(`/api/v1/users`)
                .send(user)

            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('email', user.email)
        })

        it('should return 400 if user already exist', async () => {

            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            })
            await user.save()

            const newuser = {
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            }

            const res = await request(server)
                .post(`/api/v1/users`)
                .send(newuser)

            expect(res.status).toBe(400)
            expect(res.body.err).toBe('User already exists')
        })
    })

    describe('POST /login', () => {
        it('should authenticate a user', async () => {
            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            })
            await user.save()
            
            const authuser = {
                email: 'user2@gmail.com', 
                password: 'password2', 
            }

            const res = await request(server)
                .post(`/api/v1/users/login`)
                .send(authuser)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('email', user.email)
            expect(res.body.firstName).toBeDefined()
        })

        it('should return 401 if invalid email', async () => {
            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            })
            await user.save()
            
            const authuser = {
                email: 'user@gmail.com', 
                password: 'password2', 
            }

            const res = await request(server)
                .post(`/api/v1/users/login`)
                .send(authuser)

            expect(res.status).toBe(401)
        })

        it('should return 401 if invalid password', async () => {
            const user = new User({
                firstName: 'firstName2', 
                lastName: 'lastName2', 
                email: 'user2@gmail.com', 
                password: 'password2', 
            })
            await user.save()
            
            const authuser = {
                email: 'user2@gmail.com', 
                password: 'password', 
            }

            const res = await request(server)
                .post(`/api/v1/users/login`)
                .send(authuser)

            expect(res.status).toBe(401)
        })
    })



  })