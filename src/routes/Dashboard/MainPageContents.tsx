import { useAuthenticator } from "@aws-amplify/ui-react";
import LoggedInNav from "../../components/LoggedInNav";

const MainPageContents = () => {
  const { user } = useAuthenticator();

  return (
    <div>
      <LoggedInNav />
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20">
          <h1>Hello {user?.signInDetails?.loginId}</h1>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents;
