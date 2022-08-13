import React from "react";

function About() {

    return (
        <div className="mt-6 sm:mt-20 flex flex-col items-center justify-center w-full md:w-[48rem] mx-auto">
            <div className="my-6">
                <h3 className="mx-auto text-center font-bold text-lg">Technologies used</h3>
                <div className="mt-2">
                    <span className="font-bold">Front-end&nbsp;&nbsp;</span>
                    <span>React, TailwindCSS</span>
                </div>
                <div className="mt-2">
                    <span className="font-bold">Back-end&nbsp;&nbsp;</span>
                    <span>Node, Express, MongoDB</span>
                </div>
            </div>
            <p className="italic">Allan Kossas 2022</p>
            <a href="https://github.com/allankk" className="bg-white my-4 px-10 py-2 text-black rounded-full shadow-lg hover:text-white hover:bg-indigo-800 border hover:border-indigo-700"><span>Github</span></a>
        </div>
    )
}

export default About;