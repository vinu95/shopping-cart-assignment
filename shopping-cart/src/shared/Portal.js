import { memo, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ id, children }) => {
  const modalRoot = useRef(
    document.getElementById(id) || document.createElement("div")
  );
  const bodyRef = useRef(document.body);
  const [dynamic] = useState(!modalRoot.current.parentElement);

  useEffect(() => {
    const currentRef = modalRoot.current;
    const htmlBodyref = bodyRef.current;
    if (dynamic) {
      currentRef.id = id;
      document.body.appendChild(modalRoot.current);
      htmlBodyref.setAttribute("class", "disable__backdrop");
      htmlBodyref.setAttribute("tabindex", "-1");
    }
    return () => {
      if (dynamic && currentRef.parentElement) {
        htmlBodyref.removeAttribute("class");
        htmlBodyref.setAttribute("tabindex", "0");
        currentRef.parentElement.removeChild(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  return createPortal(children, modalRoot.current);
};

export default memo(Portal);
