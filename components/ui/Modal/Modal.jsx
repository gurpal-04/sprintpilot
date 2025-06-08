import React, { useEffect } from "react";

/**
 * Modal Component
 *
 * A reusable modal component for displaying content over the main application.
 *
 * Props:
 * - isOpen (boolean): Flag indicating whether the modal is open.
 * - children (ReactNode): The content to display within the modal.
 * - onClose (function): Function to handle modal close event.
 * - Width (string, optional): Custom width for the modal.
 * - showCross (boolean, default: true): Flag to show or hide the close button.
 * - className (string, default: "bg-white"): Additional classes for styling the modal.
 * - padding (string, default: "px-6 py-6 lg:px-8"): Padding for the modal content.
 *
 * Usage:
 * <Modal
 *   isOpen={true}
 *   onClose={() => setIsOpen(false)}
 *   Width="w-1/2"
 *   showCross={true}
 *   className="bg-gray-100"
 *   padding="px-4 py-4"
 * >
 *   <div>
 *     <h2 className="text-lg font-semibold mb-4">Modal Content</h2>
 *     <p>Modal Body</p>
 *   </div>
 * </Modal>
 */

const Modal = ({
  isOpen,
  children,
  onClose,
  width = "",
  showCross = true,
  className = "bg-white",
  padding = "px-6 py-6 lg:px-8",
  CustomBtnClass = "",
  svgClassName = "",
}) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    // Add event listener for key press
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  return (
    <div>
      {isOpen && (
        <div className="fixed top-16 left-20 right-0 z-50 flex items-center justify-center h-full bg-opacity-50 bg-gray-500 backdrop-filter backdrop-blur-sm">
          <div
            className={`relative -mt-16 rounded-3xl shadow ${width} ${className}`}
          >
            {showCross && onClose && (
              <button
                type="button"
                className={`absolute z-0 top-3 right-2.5 cursor-pointer  ${
                  CustomBtnClass
                    ? CustomBtnClass
                    : "dark:hover:bg-gray-800 dark:hover:text-white  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                } `}
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className={`${svgClassName ? svgClassName : "w-5 h-5"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            )}

            <div
              className={`max-h-[calc(100vh-120px)] overflow-y-hidden ${padding}`}
            >
              <div className="overflow-y-auto max-h-[calc(100vh-150px)] p-3 z-50">
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
