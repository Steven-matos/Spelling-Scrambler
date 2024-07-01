import Navbar from "../components/Navbar";
import kids from "../image/kids_computer_upscayl_4x_ultrasharp.png";

const About = () => {
  return (
    <div className="bg-dffdff">
      <Navbar />
      <div className="isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90f3ff] to-[#6ec5ee] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-20 md:max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About us
            </h1>
            <div className="flex justify-around py-6 flex-col-reverse md:flex-row">
              <p className="my-5 mx-auto text-lg leading-8 text-gray-600 text-left">
                Welcome to Spelling Shiba Scrambler, the ultimate tool for
                making spelling practice fun and engaging for kids! Our mission
                is to transform traditional spelling exercises into an exciting
                adventure. With the help of our adorable Shiba Inu mascot,
                children can practice their school spelling words by
                unscrambling mixed-up letters. This interactive approach not
                only enhances their spelling skills but also boosts their
                confidence and enjoyment of learning. Spelling Shiba Scrambler
                is designed to turn learning into a playful experience, ensuring
                that your child looks forward to practicing their spelling words
                every day. Join us in making education a delightful journey for
                your little learners!
              </p>
              <img
                className="h-96 w-96 rounded-3xl my-6 mx-auto md:mx-10"
                src={kids}
                alt="Kids having fun on a computer"
              />
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#49b2ea] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
