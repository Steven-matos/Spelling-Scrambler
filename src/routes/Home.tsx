import Navbar from "../components/Navbar";
import logo from "../image/shiba_upscayl.png";
import "@aws-amplify/ui-react/styles.css";

function Home() {
  return (
    <div className="bg-dffdff">
      <Navbar />
      <div className="isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#90f3ff] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-20">
          <div className="text-center">
            <img
              className="mx-auto h-80 w-80 rounded-full my-10"
              src={logo}
              alt="Shiba with floating letters"
            />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to Spelling Shiba Scrambler!
            </h1>
            <div className="text-left">
              <p className="mt-6 text-lg leading-8 text-gray-600 text-left">
                Hey Parents! <br /> Are you looking for a fun and engaging way
                for your kids to practice their school spelling words? Meet
                Spelling Shiba Scrambler, the playful tool designed to make
                learning exciting! Our adorable Shiba Inu mascot will guide your
                child through interactive letter scrambles, turning spelling
                practice into a delightful adventure.{" "}
              </p>
              <p>With Spelling Shiba Scrambler, your child can:</p>
              <br />
              <ul>
                <li>
                  <b>Unscramble Words:</b> Enhance their spelling skills by
                  rearranging mixed-up letters.
                </li>
                <li>
                  <b>Boost Confidence:</b> Watch their confidence soar as they
                  master their school spelling lists.
                </li>
                <li>
                  <b>Have Fun:</b> Enjoy the journey with our cute and friendly
                  Shiba Inu companion.
                </li>
              </ul>
              <br />
              <p>
                Join us in making spelling practice a joyful and rewarding
                experience for your little learners. Let’s turn learning into
                playtime with Spelling Shiba Scrambler!
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
