import React, { useState } from "react";
import { Check, Download, Send } from "lucide-react";

function test() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    propertyName: "",
    siteUrl: "https://",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleCancel = () => {
    setFormData({
      propertyName: "",
      siteUrl: "https://",
    });
  };

  const handleDone = () => {
    alert("Setup completed!");
    setCurrentStep(1);
    setFormData({
      propertyName: "",
      siteUrl: "https://",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center">
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= 1 ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              {currentStep > 1 ? <Check size={20} /> : 1}
            </div>
            <div
              className={`h-1 w-24 ${
                currentStep > 1 ? "bg-green-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep === 2
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>

        {currentStep === 1 ? (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Property Details
            </h1>

            <div className="mb-6">
              <label
                htmlFor="propertyName"
                className="block text-gray-700 mb-2"
              >
                Property Name
              </label>
              <input
                type="text"
                id="propertyName"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleInputChange}
                placeholder="Enter property name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="siteUrl" className="block text-gray-700 mb-2">
                Site URL
              </label>
              <input
                type="text"
                id="siteUrl"
                name="siteUrl"
                value={formData.siteUrl}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="border-t border-gray-200 mt-16 pt-4 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Install Widget
            </h1>

            <p className="text-gray-600 mb-4">
              To install tawk.to, you can place this code before the{" "}
              <code className="bg-gray-100 px-1 rounded">&lt;/body&gt;</code>{" "}
              tag on every page of your website.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 overflow-auto max-h-40">
              <pre className="text-sm text-gray-700"></pre>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-700 mb-2">
                Or you can also use a tawk.to plugin for one of the popular
                platforms
              </p>
              <div className="flex items-center space-x-2">
                <select className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 bg-white">
                  <option>WordPress</option>
                  <option>Shopify</option>
                  <option>Wix</option>
                </select>
                <button className="p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div className="mb-8">
              <p className="font-medium text-gray-700 mb-2">
                You may also send these instructions to your developer
              </p>
              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  placeholder="If you want to send to multiple email addresses, separate them by comma."
                  className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                  <Send size={20} />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-4 flex justify-end">
              <button
                onClick={handleDone}
                className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default test;
