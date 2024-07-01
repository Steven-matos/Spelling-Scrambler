import LoggedInNav from "../../components/LoggedInNav";

const Settings = () => {
  return (
    <div>
      <LoggedInNav />
      <div className="isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20">
          <h1>Settings</h1>
        </div>
      </div>
    </div>
  );
};

export default Settings;
