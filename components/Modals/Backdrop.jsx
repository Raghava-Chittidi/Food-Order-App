import { createPortal } from "react-dom";

const Backdrop = (props) => {
  const backdrop = (
    <div
      className={`fixed w-screen h-screen top-0 -left-10 ${props.className}`}
      onClick={props.onClick}
    ></div>
  );

  return createPortal(backdrop, document.getElementById("backdrop"));
};

export default Backdrop;
