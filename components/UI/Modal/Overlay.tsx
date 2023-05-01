import { Fragment } from "react";
import Portal from "../Portal/Portal";

interface Props {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Overlay: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Fragment>
      <Portal querySelector="#overlay">
      <div className="fixed z-40 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        {children}
      </div>
      </Portal>
    </Fragment>
  );
};

export default Overlay;
