import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage = () => {
  const { route, user } = useAuthenticator();
  const navigate = useNavigate();

  useEffect(() => {
    if (route === "authenticated" || user?.username !== undefined) {
      navigate(`/dashboard/${user?.username}`);
    }
  }, [route, navigate]);

  return <></>;
};

export default LoginPage;
