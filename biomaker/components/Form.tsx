import classes from "./form.module.css";
import Modal from "./Modal";
import {
  FormInput,
  ModalState,
  FormFieldError,
} from "../interfaces/formInterface";
import { useState, useEffect } from "react";
import { format } from "path";

function Form(): JSX.Element {
  //States
  const [modal, setModal] = useState<ModalState>({ state: false, message: "" });
  const [formFieldError, setFormFieldError] = useState<FormFieldError>({
    skills: false,
    style: false,
    wordcount: false,
  });
  const [formInput, setFormInput] = useState<FormInput>({
    skills: "",
    style: "",
    wordcount: null,
  });

  //Store form input state
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
  }

  //Form Submission
  function handleSubmit(e: React.FormEvent): any {
    e.preventDefault();
    const numberRegex: RegExp = /^\d+$/;

    if (!formInput.skills) {
      setFormFieldError((prev) => {
        return { ...prev, skills: true };
      });
    }

    if (!formInput.style) {
      setFormFieldError((prev) => {
        return { ...prev, style: true };
      });
    }

    if (
      formInput.wordcount &&
      !(formInput.wordcount as string).match(numberRegex)
    ) {
      setFormFieldError((prev) => {
        return { ...prev, wordcount: true };
      });
    }

    if (
      !formInput.skills ||
      !formInput.style ||
      (formInput.wordcount &&
        !(formInput.wordcount as string).match(numberRegex))
    ) {
      setModal({ state: true, message: "Invalid fields" });
      return false;
    }
  }

  useEffect(() => {
    let modalTimeout: NodeJS.Timeout = setTimeout((): void => {
      setModal({ state: false, message: "" });
    }, 4000);

    return (): void => {
      clearTimeout(modalTimeout);
    };
  }, [modal]);

  return (
    <section className={classes.formsection}>
      <form className={classes.form} onSubmit={handleSubmit}>
        {modal.state && <Modal />}
        <div>
          <label htmlFor="skills">
            What skillsets do you want in your biography?
          </label>
          <input
            className={
              formFieldError.skills ? classes.forminputerror : classes.forminput
            }
            placeholder="e.g. Programming, Cooking"
            name="skills"
            id="skills"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={classes.formquestion} htmlFor="style">
            What style would you want your biography to be written in?
          </label>
          <input
            className={
              formFieldError.style ? classes.forminputerror : classes.forminput
            }
            placeholder="e.g. Professional, Informal"
            name="style"
            id="style"
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            className={classes.formquestion}
            htmlFor="wordcount"
          >{`Word Count (Optional)`}</label>
          <input
            className={
              formFieldError.wordcount
                ? classes.forminputerror
                : classes.forminput
            }
            name="wordcount"
            id="wordcount"
            onChange={handleChange}
          />
        </div>
        <div className={classes.formbuttondiv}>
          <button className={classes.formbutton}>Generate Bio</button>
        </div>
      </form>
    </section>
  );
}

export default Form;
