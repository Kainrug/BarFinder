require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./models')
const barRoutes = require('./routes/bars')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.use('/api', barRoutes)

db.sequelize
	.sync()
	.then(() => {
		console.log('Baza danych zsynchronizowana.')
		app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`))
	})
	.catch(err => {
		console.error('Błąd synchronizacji bazy danych:', err)
	})
