import { HOME_CONTENT } from "../constants";
import HomeImg from "../assets/HomeImg.jpg";

export default function Home() {
     return (
       <section id="home">
        <div className="w-full min-h-screen border-b border-neutral-900 lg:pt-40 -mt-14 -m-3">
         <div className="flex flex-wrap h-full justify-between">
           <div className="w-full lg:w-1/2 flex items-center justify-center">
             <div className="flex flex-col items-center lg:items-start">
               <h1 className="pb-4 text-6xl font-thin tracking-tight lg:text-8xl">
                 Aditi Kala
               </h1>
               <span className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-4xl tracking-tight text-transparent">
                 Full Stack Developer | DL Enthusiast
               </span>
               <p className="my-2 max-w-xl py-6 font-light tracking-tighter">
                 {HOME_CONTENT}
               </p>
             </div>
           </div>
             <div className="w-full lg:w-1/2 lg:p-8 -mt-14">
                 <div className="flex justify-center">
                     <img src={HomeImg} alt="" className="rounded-lg shadow-lg w-500 h-auto object-cover"/>
                 </div>
             </div>
         </div>
       </div>
       </section>
     );
   }