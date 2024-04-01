import dotenv from 'dotenv';
import { Kafka, logLevel } from 'kafkajs';


dotenv.config();

//details from the env

// Create the Kafka Instance and such
const kafkaConnectionBinding = {
  logLevel: logLevel.DEBUG,
  brokers: ['localhost:9092'],
  clientId: 'cart-service'
};

export const TOPIC = 'orders';

let kfk: any;

export const getKafkaClient = () => {
  if (!kfk) {
    kfk = new Kafka(kafkaConnectionBinding);
    return kfk;
  }

  return kfk;
}