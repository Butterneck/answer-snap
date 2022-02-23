import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AnswersModule } from './answers/answers.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongoDbModule } from './mongodb.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_CONNECTION_STRING: Joi.string().required(),
      }),
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      //   outputAs: 'class',
      // },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      mockEntireSchema: false
    }),
    AnswersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
