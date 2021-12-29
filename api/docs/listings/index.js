const getListings = require('./get-listings')
const getListing = require('./get-listing')
// const createTodo = require('./create-listing')
// const updateTodo = require('./update-listing')
// const deleteTodo = require('./delete-listing')

module.exports = {
    paths:{
        '/listings':{
            ...getListings,
            //...createTodo
        },
        '/listings/{id}':{
            ...getListing,
            //...updateTodo,
            //...deleteTodo
        }
    }
}