import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useCallback,
  ReactChild,
  Ref,
} from "react";
import { createPortal } from "react-dom";
import { IModalRef } from "../modal";
import "./confirmationModal.scss";

type Props = {
  children?: ReactChild | ReactChild[];
  defaultOpened?: boolean;
  fade?: boolean;
  maxWidth?: string;
};

const modalElement = document.getElementById("modal-root")!;

const ConfirmationModal = (
  { children, fade = false, defaultOpened = false, maxWidth = "800" }: Props,
  ref: Ref<IModalRef>
) => {
  const [isOpen, setIsOpen] = useState(defaultOpened);

  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  return createPortal(
    isOpen ? (
      <div className={`modal ${fade ? "modal-fade" : ""}`}>
        <div className="modal-overlay" />
        <div className="modal-body" style={{ maxWidth: `${maxWidth}px` }}>
          {children}
        </div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(ConfirmationModal);
