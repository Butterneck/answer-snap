import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { MongoDbModule } from 'src/mongodb.module';
import { DIRECTIVES } from '@graphql-codegen/typescript-mongodb';
import { ApolloFederationDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
      directiveResolvers: [DIRECTIVES.definitions.toString],
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      mockEntireSchema: false
    }),
    MongoDbModule
  ],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
