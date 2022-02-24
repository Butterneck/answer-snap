import { Module } from '@nestjs/common';
import { AnswersModule } from './answers/answers.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: Joi.object({
    //     MONGODB_CONNECTION_STRING: Joi.string().required(),
    //   }),
    // }),
    AnswersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
