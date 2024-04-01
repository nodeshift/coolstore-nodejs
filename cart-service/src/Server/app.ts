import express from 'express'
import cors from 'cors';

import { cacheConfig } from '../Config/cache.config';
import { getKafkaClient } from '../Config/kafka.config';
getKafkaClient();

const app = express();
app.use(cors());

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// //routes
import { router } from '../Routes/cart.routes'
app.use('/api/v2/cart', router)

cacheConfig().then(() => {
 app.listen(7074, () => console.log('Server is listening on port 7074'));
}).catch((err) => {
  console.log('Not started becuase: ', err);
});

export { app };
