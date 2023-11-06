import 'dotenv/config';
import "reflect-metadata"
import { DataSource } from 'typeorm';
import { NewsEntity } from './task.pod.entity';



   // Create a new DataSource instance
   export const AppDataSource = new DataSource({
      type: "postgres",
      host: process.env.DB_HOST as string,
      port: process.env.DB_PORT as unknown as number,
      username:process.env.DB_USERNAME as string,
      password:process.env.DB_PASSWORD as string,
      database:process.env.DATABASE as string,
      entities: [NewsEntity],
      synchronize: true,
      logging: false,
   });
   
   AppDataSource.initialize()
    .then(() => {
        console.log('Connected to the database')
    })
    .catch((error) => console.log('Failed to connect to the database:',error))
   
