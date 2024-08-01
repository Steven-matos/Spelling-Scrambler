import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Tests: a.model({
      weekof: a.string().required(),
      words: a.hasMany("Words", "testId"),
      taken: a.integer().required(),
      correct: a.integer().required(),
    }),
    Words: a.model({
      word: a.string().required(),
      testId: a.id().required(),
      test: a.belongsTo("Tests", "testId"),
    }),
  })
  .authorization((allow) => [allow.owner()]);

export type Schema = ClientSchema<typeof schema>;

export type Test = {
  id: string;
  weekof: string;
  taken: number;
  correct: number;
  words: Word[];
};

export type Word = {
  id: string;
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
