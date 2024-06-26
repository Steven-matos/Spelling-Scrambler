import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate, Outlet } from "react-router-dom";
import { useEffect } from "react";

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
      <Outlet /> {/* This will render the nested route components */}
    </div>
  );
};

export default MainPage;
