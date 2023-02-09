import classes from "./form.module.css";
import { useState } from "react";

function Form(): JSX.Element {
  //States
  const [formInput, setFormInput] = useState({
    skills: "",
    style: "",
    wordcount: "",
  });

  //Store form input state
  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const name = e.target.name;
    const value = e.target.value;
    setFormInput({ ...formInput, [name]: value });
  }

  //Form Submission
  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
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
