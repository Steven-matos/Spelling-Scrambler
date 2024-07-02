import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Tests: a
      .model({
        testId: a.id().required(),
        weekof: a.string().required(),
        words: a.hasMany("Words", "testId"),
      })
      .identifier(["testId"]),
    Words: a.model({
      wordId: a.id().required(),
      word: a.string().required(),
      testId: a.id(),
      test: a.belongsTo("Tests", "testId"),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export type Test = {
  testId: string;
  weekof: string;
  words: Word[];
};

export type Word = {
  wordId: string;
  word: string;
  testId: string;
};

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
