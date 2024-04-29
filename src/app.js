import express from 'express'
import path from 'path'
import hbs from 'hbs'
import mainRoute from './routes/mainRoute.js'

const app = express()

const publicDir = path.join(import.meta.dirname, '../public')
const viewsPath = path.join(import.meta.dirname, '../templates/views')
const partialsPath = path.join(import.meta.dirname, '../templates/partials')

app.set('trust proxy', true)
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDir))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(mainRoute)

export default app
