const express = require('express')
const createError = require('http-errors')
const morgan = require('morgan')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Disable X-Powered-By header
app.disable('x-powered-by')

// Routes
app.get('/', async (req, res, next) => {
	res.send({ message: 'Awesome it works 🐻' })
})

// Define routes
app.use('/api', require('./routes/api.route'))

// Error handling
app.use((req, res, next) => {
	next(createError.NotFound())
})

app.use((err, req, res, next) => {
	res.status(err.status || 500)
	res.send({
		status: err.status || 500,
		message: err.message,
	})
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`))
