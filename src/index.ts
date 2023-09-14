import dotenv from 'dotenv'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import router from './controller/Router'
import mainKnexInstance from './infra'
import { modifyResponseBody } from './helper/modifyResponse'
import { errorHandler } from './helper/errorHandler'
import { jwtMiddleware } from './helper/jwtMiddleware'
import { Pagination } from './helper/Pagination'

dotenv.config()

const PORT = process.env.PORT || '5000'
console.log('port', process.env.PORT)

const app: Express = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(modifyResponseBody)
app.set('db', mainKnexInstance)

app.use(jwtMiddleware)
app.use(Pagination)
app.use('/api', router)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Running on port ${PORT}`))