import { Resolver, Query, Mutation, Args, ResolveField, ResolveReference } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { Answer, AnswerDbObject, CreateAnswerInput, UpdateAnswerInput } from 'src/generated/graphql';
import { AnswersService } from './answers.service';

@Resolver('Answer')
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation('createAnswer')
  create(@Args('createAnswerInput') createAnswerInput: CreateAnswerInput): Observable<AnswerDbObject | null> {
    return this.answersService.create(createAnswerInput);
  }

  @Query('answers')
  findAll(): Observable<AnswerDbObject[] | null> {
    return this.answersService.findAll();
  }

  @Query('answer')
  findOne(@Args('id') id: string): Observable<AnswerDbObject | null> {
    return this.answersService.findOne(id);
  }

  @Mutation('updateAnswer')
  update(@Args('updateAnswerInput') updateAnswerInput: UpdateAnswerInput): Observable<AnswerDbObject | null> {
    return this.answersService.update(updateAnswerInput.id, updateAnswerInput);
  }

  @Mutation('removeAnswer')
  remove(@Args('id') id: string): Observable<AnswerDbObject | null> {
    return this.answersService.remove(id);
  }

  @ResolveField('id')
  get_id(answer: Answer | AnswerDbObject): string {
    return (answer as Answer).id || (answer as AnswerDbObject)._id.toString();
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.answersService.findOne(reference.id);
  }
  
}
