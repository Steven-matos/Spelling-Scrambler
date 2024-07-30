import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a
  .schema({
    Tests: a.model({
      weekof: a.string().required(),
      words: a.hasMany("Words", "testId"),
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
  weekof: string;
  words: Word[];
};

export type Word = {
  word: string;
  testId: Number;
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
