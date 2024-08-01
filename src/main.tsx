import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Authenticator,
  Text,
  useTheme,
  Heading,
  View,
  Button,
  Image,
  useAuthenticator,
} from "@aws-amplify/ui-react";
import Navbar from "./components/Navbar";
import Contact from "./routes/Contact";
import About from "./routes/About";
import NotFound from "./routes/NotFound";
import Home from "./routes/Home";
import logo from "./image/shiba_upscayl.png";
import "@aws-amplify/ui-react/styles.css";
import MainPage from "./routes/Dashboard/MainPage";
import LoginPage from "./routes/LoginPage";
import MainPageContents from "./routes/Dashboard/MainPageContents";
import Footer from "./components/Footer";
import Reports from "./routes/Dashboard/Reports";
import CreateTest from "./routes/Dashboard/Test";
import Settings from "./routes/Dashboard/Settings";
import Test from "./routes/Test/Test";

Amplify.configure(outputs);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    const components = {
      Header() {
        const { tokens } = useTheme();

        return (
          <View
            textAlign="center"
            padding={tokens.space.large}
            className="mx-auto h-40 w-40 rounded-full"
          >
            <Navbar onLogin={true} />
            <Image alt="Shiba Scrambler logo" src={logo} />
          </View>
        );
      },
      Footer() {
        const { tokens } = useTheme();

        return (
          <View textAlign="center" padding={tokens.space.large}>
            <Text color={tokens.colors.neutral[80]}>
              &copy; All Rights Reserved
            </Text>
          </View>
        );
      },
      SignIn: {
        Header() {
          const { tokens } = useTheme();

          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Sign in to your account
            </Heading>
          );
        },
        Footer() {
          const { toForgotPassword } = useAuthenticator();

          return (
            <View textAlign="center">
              <Button
                fontWeight="normal"
                onClick={toForgotPassword}
                size="small"
                variation="link"
              >
                Reset Password
              </Button>
            </View>
          );
        },
      },
      SignUp: {
        Header() {
          const { tokens } = useTheme();

          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Create a new account
            </Heading>
          );
        },
        Footer() {
          const { toSignIn } = useAuthenticator();

          return (
            <View textAlign="center">
              <Button
                fontWeight="normal"
                onClick={toSignIn}
                size="small"
                variation="link"
              >
                Back to Sign In
              </Button>
            </View>
          );
        },
      },
      ConfirmSignUp: {
        Header() {
          const { tokens } = useTheme();
          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Enter Information:
            </Heading>
          );
        },
      },
      ConfirmSignIn: {
        Header() {
          const { tokens } = useTheme();
          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Enter Information:
            </Heading>
          );
        },
        Footer() {
          return <Text>Footer Information</Text>;
        },
      },
      ForgotPassword: {
        Header() {
          const { tokens } = useTheme();
          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Enter Information:
            </Heading>
          );
        },
      },
      ConfirmResetPassword: {
        Header() {
          const { tokens } = useTheme();
          return (
            <Heading
              padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
              level={3}
            >
              Enter Information:
            </Heading>
          );
        },
      },
    };

    const formFields = {
      signIn: {
        username: {
          placeholder: "Enter your Email",
          isRequired: true,
        },
      },
      signUp: {
        preferred_username: {
          label: "Username:",
          placeholder: "Enter your Username:",
          isRequired: true,
          order: 1,
        },
        email: {
          label: "Email:",
          placeholder: "Enter your Email:",
          isRequired: true,
          order: 2,
        },
        password: {
          label: "Password:",
          placeholder: "Enter your Password:",
          isRequired: true,
          order: 3,
        },
        confirm_password: {
          label: "Confirm Password:",
          order: 4,
        },
      },
      forceNewPassword: {
        password: {
          placeholder: "Enter your Password:",
        },
      },
      forgotPassword: {
        username: {
          placeholder: "Enter your email:",
        },
      },
      confirmResetPassword: {
        confirmation_code: {
          placeholder: "Enter your Confirmation Code:",
          label: "New Label",
          isRequired: false,
        },
        confirm_password: {
          placeholder: "Enter your Password Please:",
          isRequired: true,
        },
      },
      confirmSignIn: {
        confirmation_code: {
          label: "New Label",
          placeholder: "Enter your Confirmation Code:",
          isRequired: false,
        },
      },
    };

    return (
      <Authenticator
        formFields={formFields}
        components={components}
        className="auth-container"
      />
    );
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <LoginPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ":id",
        element: <MainPageContents />,
      },
      {
        path: ":id/create-tests",
        element: <CreateTest />,
      },
      {
        path: ":id/reports",
        element: <Reports />,
      },
      {
        path: ":id/settings",
        element: <Settings />,
      },
      {
        path: ":id/test/:testId",
        element: <Test />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <main>
      <Authenticator.Provider>
        <RouterProvider router={router} />
      </Authenticator.Provider>
    </main>
    <Footer />
  </React.StrictMode>
);
