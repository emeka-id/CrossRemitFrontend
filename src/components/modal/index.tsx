import React, {
  ReactElement,
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useCallback,
  Ref,
} from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";
import Card from "../card";

type Props = {
  children: ReactElement[];
  defaultOpened?: boolean;
  fade?: boolean;
};

export interface IModalRef {
  open: () => void;
  close: () => void;
}

const modalElement = document.getElementById("modal-root")!;

const Modal = (
  { children, defaultOpened = false, fade = false }: Props,
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

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`${styles.modal} ${fade ? `${styles.modal_fade}` : ""}`}>
        <div className={styles.modal_overlay} onClick={close} />
        <span
          role="button"
          className={styles.modal_close}
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className={styles.modal_body}>
          <Card>{children}</Card>
        </div>
      </div>
    ) : null,
    modalElement
  );
};

export default forwardRef(Modal);
