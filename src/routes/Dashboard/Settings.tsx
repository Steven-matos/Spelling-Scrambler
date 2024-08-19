import React from "react";
import { NavLink, useParams } from "react-router-dom";
import LoggedInNav from "../../components/LoggedInNav";
import { Heading } from "@aws-amplify/ui-react";

const Settings: React.FC = () => {
  const { id } = useParams();
  return (
    <div>
      <LoggedInNav />
      <div className="isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20">
          <Heading marginTop="small" level={2}>
            Settings
          </Heading>
          <div className="mt-8">
            <NavLink
              to={`/dashboard/${id}/settings/change-password`}
              className="hover:underline"
            >
              Change Password
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
