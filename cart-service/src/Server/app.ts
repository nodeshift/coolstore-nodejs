import express from 'express'
import { db} from '../Config/cache.config'
import { router } from '../Routes/cart.routes'

const app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//routes
app.use('/api/v2/cart', router)

//db connection then server connection
db.then(() => {
    app.listen(7070, () => console.log('Server is listening on port 7070'))
})

export { app };
