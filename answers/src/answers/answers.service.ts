import { Inject, Injectable, Logger } from '@nestjs/common';
import { Collection, Db, DeleteResult, Document, InsertOneResult, ObjectId, UpdateResult, WithId } from 'mongodb';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { AnswerDbObject, CreateAnswerInput, UpdateAnswerInput } from 'src/generated/graphql';

@Injectable()
export class AnswersService {
  private readonly answers_collection: Collection<Document>;

  constructor(
    @Inject('MONGODB_CONNECTION') private db: Db,
  ) {
    this.answers_collection = db.collection('answers')
  }

  create(createAnswerInput: CreateAnswerInput): Observable<AnswerDbObject | null> {
    Logger.log('This action adds a new answer');
    return from(this.answers_collection.insertOne({
      body: createAnswerInput.body,
      question: createAnswerInput.question,
    })).pipe(
      switchMap((result: InsertOneResult<Document>) => {
        return this.answers_collection.findOne({ _id: result.insertedId });
      }),
      map((result: WithId<Document>) => result as AnswerDbObject ),
    );
  }

  findAll(): Observable<AnswerDbObject[] | null> {
    Logger.log(`This action returns all answers`);
    return from(this.answers_collection.find({}).toArray()).pipe(
      map((result: WithId<Document>[]) => {
        return result as AnswerDbObject[]
      })
    );
  }

  findOne(id: string): Observable<AnswerDbObject | null> {
    Logger.log(`This action returns a #${id} answer`);
    return from(this.answers_collection.findOne({ _id: new ObjectId(id) })).pipe(
      map((result: WithId<Document>) => result as AnswerDbObject ),
    );
  }

  update(id: string, updateAnswerInput: UpdateAnswerInput): Observable<AnswerDbObject | null> {
    Logger.log(`This action updates a #${id} answer`);
    return from(this.answers_collection.updateOne({ _id: new ObjectId(id) }, { body: updateAnswerInput.body })).pipe(
      tap((result: UpdateResult) => console.log(result)),
      map((result: UpdateResult) => null),
    );
  }

  remove(id: string): Observable<AnswerDbObject | null> {
    Logger.log(`This action removes a #${id} answer`);
    return from(this.answers_collection.deleteOne({ _id: new ObjectId(id) })).pipe(
      tap((result: DeleteResult) => console.log(result)),
      map((result: DeleteResult) => null),
    );
  }
}
