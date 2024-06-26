import { useAuthenticator } from "@aws-amplify/ui-react";

const MainPageContents = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div>
      <h1>Hello {user?.signInDetails?.loginId}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
};

export default MainPageContents;
