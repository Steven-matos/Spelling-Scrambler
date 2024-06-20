import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    externalProviders: {
      google: {
        clientId: secret("LOGINWITHGOOGLE_CLIENT_ID"),
        clientSecret: secret("LOGINWITHGOOGLE_CLIENT_SECRET"),
      },
      callbackUrls: [
        "http://localhost:5173/",
        "https://main.d2zsc4znzaqj34.amplifyapp.com/",
      ],
      logoutUrls: [
        "http://localhost:5173/",
        "https://main.d2zsc4znzaqj34.amplifyapp.com/",
      ],
    },
    email: true,
  },
});
