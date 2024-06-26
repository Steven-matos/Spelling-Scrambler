import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "../components/Navbar";

const AuthContent = () => {
  const { user, signOut } = useAuthenticator(); // Use the useAuthenticator hook to get user state

  console.log("User", user);

  return (
    <>
      {!user ? (
        <Navbar />
      ) : (
        <div>
          <h1>Hello {user?.username}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default AuthContent;
