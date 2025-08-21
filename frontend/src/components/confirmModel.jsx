import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-opacity-5 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onCancel} // clicking outside closes modal
    >
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-96 max-w-sm mx-4 relative transition-transform transform scale-100"
        role="dialog"
        tabIndex={-1}
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // prevent inner click from closing
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            onCancel();
          }
        }}
      >
        {/* Close icon */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <IoClose size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>

        {/* Message */}
        <p className="mb-6 text-gray-600">{message}</p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  // 🔥 render modal in <body> instead of parent component
  return ReactDOM.createPortal(modalContent, document.body);
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  title: "Alert",
  message: "Are you sure?",
};

export default ConfirmModal;
