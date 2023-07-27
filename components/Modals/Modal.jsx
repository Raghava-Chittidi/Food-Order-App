import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai/index.esm";

const Modal = ({ header, children, closeModal, className, cross }) => {
  const modal = (
    <div
      className={`fixed top-5 z-20 bg-white rounded-lg w-4/5 xl:w-1/3 lg:w-2/5 md:w-1/2 sm:w-3/5 h-fit left-1/2 -translate-x-1/2 ${className}`}
    >
      <header className="flex items-center w-full justify-between">
        <span>{header}</span>
        {cross !== false && (
          <AiOutlineClose
            onClick={closeModal}
            size={24}
            className="cursor-pointer absolute text-white top-2 right-2"
          />
        )}
      </header>
      <div>{children}</div>
    </div>
  );

  return createPortal(modal, document.getElementById("modal"));
};

export default Modal;
