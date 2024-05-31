import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { questions } from "./index.js";
import "./App.css";

const App = () => {
  const [responses, setResponses] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (id, value) => {
    setResponses({
      ...responses,
      [id]: value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="container mx-auto p-6 bg-white-100">
      <h1 className="text-3xl mb-8 font-bold text-center text-[#112D4E]">
        Jewellery Form
      </h1>
      <form>
        {questions.map((q) => (
          <div key={q.id} className="mb-8">
            <label className="text-lg font-medium text-[#3F72AF] block mb-2">
              {q.question}
              <FaInfoCircle
                data-tooltip-id={q.id}
                className="ml-2 text-gray-500 cursor-pointer"
              />
            </label>
            <ReactTooltip
              id={q.id}
              place="right"
              content={q.note}
              variant="info"
            />
            {q.inputType === "select" && (
              <>
                <select
                  className="block appearance-none w-full bg-[#DBE2EF] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  value={responses[q.id] || ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <option value="">Select an option</option>
                  {q.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {responses[q.id] === "Custom" && (
                  <input
                    type="text"
                    placeholder="Enter custom occasion"
                    className="mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-golden-light"
                    value={responses.customOccasion || ""}
                    onChange={(e) =>
                      handleChange("customOccasion", e.target.value)
                    }
                  />
                )}
              </>
            )}
            {q.inputType === "selectIcons" && (
              <div>
                {q.options.map((option) => (
                  <label key={option} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={responses[q.id] === option}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {q.inputType === "radio" && (
              <div>
                {q.options.map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center mr-4 text-[#112D4E]"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={responses[q.id] === option}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {q.inputType === "dropdown" && (
              <select
                className="block appearance-none w-full bg-g[#DBE2EF] border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                value={responses[q.id] || ""}
                onChange={(e) => handleChange(q.id, e.target.value)}
              >
                <option value="">Select an option</option>
                {q.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {q.additionalAction &&
              responses[q.id] === q.additionalAction.condition && (
                <div>
                  <label className="text-lg font-medium text-[#3F72AF] block mt-2">
                    {q.additionalAction.prompt}
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-2 block w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-golden-light"
                  />
                </div>
              )}
          </div>
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 bg-[#112D4E] text-white font-semibold rounded-lg shadow-md hover:bg-[#3F72AF] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
