import classes from "./modal.module.css";

function Modal(): JSX.Element {
  return (
    <div className={classes.modal}>
      <span>Invalid Fields</span>
    </div>
  );
}

export default Modal;
