// TODO: Turn into module that can be configured through ConfigService!!!
// https://dev.to/nestjs/advanced-nestjs-how-to-build-completely-dynamic-nestjs-modules-1370

import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import * as dotenv from 'dotenv';

@Module({
  providers: [
    {
      provide: 'MONGODB_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {
          dotenv.config()

          const client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING);

          return client.db(process.env.MONGODB_DATABASE_NAME);
        } catch (e) {
          throw e;
        }
      }
    },
  ],
  exports: ['MONGODB_CONNECTION'],
})
export class MongoDbModule { }