"use client";

import Nav from "@/components/Navbar";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuestion,
  deleteQuestion,
  setTitle,
  setDesc,
  setActiveQuestionIndex,
} from "@/redux/formSlice";
import Question from "./Question";
import Edit from "./Edit";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const Form = () => {
  const dispatch = useDispatch();
  const title = useSelector((state: RootState) => state.form.title);
  const description = useSelector((state: RootState) => state.form.desc);
  const questions = useSelector((state: RootState) => state.form.questions);
  //console.log("ques", questions);
  const activeQuestionIndex = useSelector(
    (state: RootState) => state.form.activeQuestionIndex
  );
  const [loading, setLoading] = useState(false);
  const handleTitleChange = (e: any) => {
    e.preventDefault();
    dispatch(setTitle(e.target.value));
  };

  const handleDescChange = (e: any) => {
    e.preventDefault();
    dispatch(setDesc(e.target.value));
  };

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleDeleteQuestion = (index: number) => {
    dispatch(deleteQuestion(index));
  };
  const handleQuestionClick = (index: number) => {
    dispatch(setActiveQuestionIndex(index));
  };
  const router = useRouter();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formdata = { title, description, questions };
      console.log("f", formdata)
      const response = await fetch("/api/form", {
        method: "POST",
        body: JSON.stringify(formdata),
      });
      if (response.ok) {
        console.log(response)
        router.push("/formlist");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav />
      <div className="bg-[#29A0B1]/10 w-full grid mx-auto min-h-screen py-10">
        <form onSubmit={handleSubmit}
          className="w-full block mx-auto h-full px-6 md:px-0 overflow-x-hidden"
        >
          <div className="flex md:flex-row flex-col justify-center items-center max-w-3xl mx-auto">
            <div className="border-t-8 rounded-md my-6 border-[#29A0B1] bg-white max-w-2xl shadow w-full grid place-items-center mx-auto">
              <div className="w-full border border-gray-300">
                <div className="w-full px-6 py-2">
                  <input
                    type="text"
                    onChange={handleTitleChange}
                    value={title ?? ""}
                    required
                    className="text-3xl outline-none font-bold capitalize border-b 
                focus:border-b-2 border-gray-200 pt-3 pb-2 w-full focus:border-[#29A0B1]"
                  />
                </div>
                <div className="w-full px-6 py-1 mb-6">
                  <input
                    type="text"
                    onChange={handleDescChange}
                    value={description ?? ""}
                    required
                    placeholder="Form Description"
                    className="text-base outline-none font-medium capitalize border-b 
                focus:border-b-2 border-gray-200 focus:border-[#29A0B1] py-1 w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              {questions.length === 0 && (
                <Edit
                  handleAdd={handleAddQuestion}
                  show
                  handleDelete={() =>
                    handleDeleteQuestion(questions.length - 1)
                  }
                />
              )}
            </div>
          </div>
          <div className="relative">
            {questions.map((question, index) => (
              <Question
                onclick={() => handleQuestionClick(index)}
                key={index}
                index={index}
                value={question}
                addQuestion={handleAddQuestion}
                handleDelete={() => handleDeleteQuestion(index)}
                isActiveQuestion={index === activeQuestionIndex}
              />
            ))}
          </div>
          <div>
            {questions.length > 0 && (
              <div className="grid place-items-center w-auto mx-auto">
                <button
                  type="submit"
                  className="bg-[#29A0B1] text-white px-6 py-3 rounded"
                >
                  {loading ? "Processing" : "Save Form"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
