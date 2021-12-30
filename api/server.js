const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const connectDB = require('./config/db')
const users = require('./routes/api/users')
const uploads = require('./routes/api/uploads')
const listings = require('./routes/api/listings')
const { notFound, errorHandler }  = require('./middleware/errorMiddleware')
//const docs = require('./docs')

//Load config
dotenv.config()

if(process.env.NODE_ENV !== 'test'){
  //Connect Database
  connectDB()
}


const app = express()

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200 // For legacy browser support
}

//Body parser middeware
//app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Enable cors
app.use(cors())

// configure and setup swagger

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Listing Express API with Swagger",
      version: "0.1.0",
      description:
        "API documentaion with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Plurce",
        url: "https://xxxxxxx",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5001/api/v1",
        description: "This is for dev server"
      },
      {
        url: "https://property.plurce.com/api/v1",
        description: "This is for live server"
      },
    ],
  },
  apis: ["./routes/api/*.js"],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

//Use routes
app.use('/api/v1/users', users)
app.use('/api/v1/upload', uploads)
app.use('/api/v1/listings', listings)
app.use('/api-docs-v1', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }))

//Logging
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/', (req, res) => {
  res.send('API is running....')
})

//const specs = swaggerJsdoc(docs)
//app.use('/docs',swaggerUi.serve,swaggerUi.setup(docs, { explorer: true }))
  
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} MODE on port ${PORT}`))

module.exports = server