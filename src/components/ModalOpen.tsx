import React, { ReactElement } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

export default function ModalOpen(props: ModalProps): ReturnType<FC> {
  return (
    <div
      className={`${"modal"} ${props.open ? "display-block" : "display-none"}`}
    >
      <div className="modal-main">
        <div className="modal-head">
          <h1>Modal</h1>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="btn-container">
          <button
            type="button"
            className="btn px-5 bg-red-600 px-5 py-0.5 border-b-2 border-red-700 rounded-md shadow-md"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
