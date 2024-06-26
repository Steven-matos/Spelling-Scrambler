import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

import LoggedInNav from "../../components/LoggedInNav";

const MainPage = () => {
  const { route } = useAuthenticator();

  const navigate = useNavigate();

  useEffect(() => {
    if (route === "signOut") {
      navigate("/login");
    }
  }, [route, navigate]);

  return (
    <div>
      <LoggedInNav />
      <Outlet /> {/* This will render the nested route components */}
    </div>
  );
};

export default MainPage;
