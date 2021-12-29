const basicInfo = require('./basicInfo')
const servers = require('./servers')
const components = require('./components')
//const tags = require('./tags');
const listings = require('./listings')

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...listings
}