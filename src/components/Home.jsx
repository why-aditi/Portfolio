import { HOME_CONTENT } from "../constants";
import HomeImg from "../assets/HomeImg.jpg";

export default function Home() {
  return (
    <section id="home">
      <div className="w-full min-h-screen border-b border-neutral-900 lg:pt-40 md:my-10 sm:my-10 lg:-my-14">
        <div className="flex flex-wrap h-full justify-between">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="flex flex-col items-center lg:items-start">
              <h1 className="pb-4 text-6xl font-thin tracking-tight lg:text-8xl">
                Aditi Kala
              </h1>
              <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
              Full Stack Developer | Python & AI 
              </span>
              <p className="my-4 max-w-xxl py-6 font-light tracking-tighter text-justify">
                {HOME_CONTENT}
              </p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:p-8 -mt-14 -mx-4">
            <div className="flex justify-center ">
              <img
                src={HomeImg}
                alt="Home Image"
                className="rounded-lg shadow-lg w-4/5 h-auto md:my-10 sm:my-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
