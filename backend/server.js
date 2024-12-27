require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models')
const barRoutes = require('./routes/bars')
const matchRoutes = require('./routes/matches')
const reviewRoutes = require('./routes/reviews')
const menuRoutes = require('./routes/menu')
const userRoutes = require('./routes/users')
const subscriptionRoutes = require('./routes/subscriptions')
const BarMatchesRoutes = require('./routes/bar_matches')
const { errorHandler } = require('./middleware/errorHandler')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.use(errorHandler)
app.use('/api', barRoutes)
app.use('/api', matchRoutes)
app.use('/api', reviewRoutes)
app.use('/api', menuRoutes)
app.use('/api', userRoutes)
app.use('/api', subscriptionRoutes)
app.use('/api', BarMatchesRoutes)

db.sequelize
	.sync()
	.then(() => {
		console.log('Baza danych zsynchronizowana.')
		app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`))
	})
	.catch(err => {
		console.error('Błąd synchronizacji bazy danych:', err)
	})
