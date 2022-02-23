import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersResolver } from './answers.resolver';
import { MongoDbModule } from 'src/mongodb.module';

@Module({
  imports: [MongoDbModule],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
