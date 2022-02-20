import { DateTimeResolver } from "graphql-scalars";
import { ObjectId } from "mongodb";
import { AddQuestionInput, Question, QuestionDbObject } from "./graphql-codegen-typings";
import { mongoDbProvider } from "./mongodb.provider";

export const resolvers = {
    DateTime: DateTimeResolver,
    // Mutation: {
    //     addQuestion: async (
    //         obj: any,
    //         { input }: { input: AddQuestionInput }
    //     ): Promise<QuestionDbObject> => {
    //         const result_id = await mongoDbProvider.questionsCollection.insertOne({
    //             title: input.title,
    //             body: input.body,
    //             publishedAt: new Date(),
    //             createdBy: "get_user_id_from_cognito",
    //             recipient: input.recipient,
    //         });

    //         const result_object = await mongoDbProvider.questionsCollection.findOne({ _id: result_id.insertedId })
    //         return result_object as QuestionDbObject;
    //     },
    // },
    // Query: {
    //     question: async (
    //         obj: any,
    //         { id }: { id: string }
    //     ): Promise<QuestionDbObject | null> => {
    //         return await mongoDbProvider.questionsCollection
    //             .findOne({ _id: new ObjectId(id) }) as QuestionDbObject

    //     },
    // },
    // Question: {
    //     id: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject)._id,
    //     title: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject).title,
    //     body: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject).body,
    //     recipient: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject).recipient,
    //     createdBy: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject).createdBy,
    //     createdAt: (obj: Question | QuestionDbObject): string | ObjectId =>
    //         (obj as Question).id || (obj as QuestionDbObject).createdAt,

    // },
};
