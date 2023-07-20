import express from 'express'
import { router } from '../Routes/cart.routes'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v2/cart', router)

app.listen(7074, () => console.log('Server is listening on port 7074'))

export { app };
