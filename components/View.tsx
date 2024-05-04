"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import ShortAnswer from "./qtypes/ShortAnswer";
import Paragraph from "./qtypes/Paragraph";

const View = ({ params }: { params: string }) => {
  const [forms, setForms] = useState<any>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/form/${params}`, {
          method: "POST",
          body: JSON.stringify({ params }),
        });
        const data = await response.json();
        if (data) {
          setForms(data.form);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      <Navbar />
      {loading ? (
        <div className="my-10 grid place-items-center w-full">
          Loading .....
        </div>
      ) : (
        <div>
          <div className="bg-[#29A0B1]/10 w-full grid mx-auto min-h-screen py-10">
            <form className="w-full block mx-auto h-full px-6 md:px-0 overflow-x-hidden">
              <div className="flex md:flex-row flex-col justify-center items-center max-w-3xl mx-auto">
                <div className="border-t-8 rounded-md my-6 border-[#29A0B1] bg-white max-w-2xl shadow w-full grid place-items-center mx-auto">
                  <div className="w-full border border-gray-300">
                    <div className="w-full px-6 py-2">
                      <div
                        className="text-3xl outline-none font-bold capitalize border-b 
      focus:border-b-2 border-gray-200 pt-3 pb-2 w-full focus:border-[#29A0B1]"
                      >
                        {forms && forms.title}
                      </div>
                    </div>
                    <div className="w-full px-6 py-1 mb-6">
                      <div
                        className="text-base outline-none font-medium capitalize border-b 
      focus:border-b-2 border-gray-200 focus:border-[#29A0B1] py-1 w-full"
                      >
                        {forms && forms.description}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                {forms &&
                  forms.questions.map((ques: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex flex-col justify-center items-center w-full max-w-3xl mx-auto "
                    >
                      <div
                        className={` rounded-md my-6 bg-white max-w-2xl shadow w-full grid place-items-center lg:place-items-start lg:ml-10 mx-auto`}
                      >
                        <div className="w-full md:px-6 px-2 flex md:flex-row flex-col md:justify-between justify-center items-center gap-8 py-6">
                          <div className="text-base px-4 outline-none capitalize border-b bg-gray-100 focus:border-b-2 border-gray-400 pt-3 pb-2 w-full focus:border-[#29A0B1]">
                            {ques.title}
                          </div>
                        </div>
                        <div className="w-full">
                          {ques.type === "Short Answer" && <ShortAnswer />}
                          {ques.type === "Paragraph" && <Paragraph />}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div>
                <div className="grid place-items-center w-auto mx-auto">
                  <button
                    type="submit"
                    className="bg-[#29A0B1] font-bold uppercase text-white px-6 py-3 rounded"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
