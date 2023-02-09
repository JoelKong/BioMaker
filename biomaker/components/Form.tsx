import classes from "./form.module.css";
import { FormInput, Modal } from "../interfaces/formInterface";
import { useState } from "react";

function Form(): JSX.Element {
  //States
  const [modal, setModal] = useState<Modal>({ state: false, message: "" });
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
    const numberRegex: RegExp = /^[0-9]+$/;
    if (
      !formInput.skills ||
      !formInput.style ||
      (formInput.wordcount as string).match(numberRegex)
    ) {
      setModal({ state: true, message: "Invalid fields" });
      return false;
    }
  }

  return (
    <section className={classes.formsection}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="skills">
            What skillsets do you want in your biography?
          </label>
          <input
            className={classes.forminput}
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
            className={classes.forminput}
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
            className={classes.forminput}
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
