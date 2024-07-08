import CreateTestForm from "../../components/CreateTestForm";
import LoggedInNav from "../../components/LoggedInNav";

const Test = () => {
  return (
    <div>
      <LoggedInNav />
      <div className="isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20">
          <h1 className="text-4xl py-4 text-center">Create Test Below</h1>
          <CreateTestForm />
        </div>
      </div>
    </div>
  );
};

export default Test;
