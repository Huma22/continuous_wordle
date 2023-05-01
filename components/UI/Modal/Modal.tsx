import { MouseEventHandler, useRef } from "react";
import styles from "./Modal.module.css";
import Overlay from "./Overlay";

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
}

const Modal: React.FC<Props> = ({ children, onClick }) => {
  const stopPropagation: MouseEventHandler<HTMLDivElement> = (
    MouseEventHandler
  ) => {
    MouseEventHandler.stopPropagation();
  };
  const modalRef = useRef<HTMLDivElement>(null);

  const closeClickHandler = () => {
    modalRef.current?.classList.add(styles["modal-closing"]);
  };

  const closeModalEndAnimationHandler = () => {
    if (modalRef.current?.classList.contains(styles["modal-closing"])) {
      modalRef.current?.classList.remove(styles["modal-closing"]);
      onClick?.();
    }
  };

  return (
    <Overlay onClick={closeClickHandler}>
      <div className="fixed z-50 inset-0 overflow-y-auto">
  <div
    className="flex items-center justify-center min-h-screen px-4 text-center"
    onClick={onClick}
  >
    <div
      ref={modalRef}
      className="relative inline-block p-4 mx-auto overflow-hidden text-left align-middle bg-gray-900 rounded-lg shadow-xl max-h-full w-90 sm:w-96"
      onClick={(e) => e.stopPropagation()}
      onAnimationEnd={closeModalEndAnimationHandler}
    >
      <div className="absolute top-0 right-0 mt-3 mr-3">
        <button
          className="text-white rounded-md hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
          onClick={closeClickHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {children}
    </div>
  </div>
</div>

    </Overlay>
  );
};

export default Modal;
