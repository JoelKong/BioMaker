import classes from "./form.module.css";
import Modal from "./Modal";
import {
  FormInput,
  ModalState,
  FormFieldError,
} from "../interfaces/formInterface";
import { useState, useEffect } from "react";

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
  const [generatedBio, setGeneratedBio] = useState<String>("");
  const [successfulSubmit, setSuccessfulSubmit] = useState<Boolean>(false);
  const [disabled, setDisabled] = useState<Boolean>(false);

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
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, skills: true };
      });
    } else {
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, skills: false };
      });
    }

    if (!formInput.style) {
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, style: true };
      });
    } else {
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, style: false };
      });
    }

    if (
      formInput.wordcount &&
      !(formInput.wordcount as string).match(numberRegex)
    ) {
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, wordcount: true };
      });
    } else {
      setFormFieldError((prev): FormFieldError => {
        return { ...prev, wordcount: false };
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

    const generateBio = async () => {
      setGeneratedBio("");
      setDisabled(true);
      setSuccessfulSubmit(true);
      let prompt: string = `Generate me a biography using "I" to refer to myself with the following skillsets: ${
        formInput.skills
      }. I want it to be in the following styles: ${formInput.style}. ${
        formInput.wordcount
          ? `Generate this in ${formInput.wordcount} words.`
          : "Generate this in 50 words"
      }`;

      const sendPrompt = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const bio = sendPrompt.body;

      if (!bio) {
        return;
      }
      const reader = bio.getReader();
      const decoder = new TextDecoder();
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        setGeneratedBio((prev) => prev + chunkValue);
        if (done) {
          reader.releaseLock();
          setSuccessfulSubmit(false);
          setDisabled(false);
        }
      }
    };
    generateBio();
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
            onChange={handleChange}
          />
        </div>
        <div className={classes.formbuttondiv}>
          <button className={classes.formbutton} disabled={disabled}>
            {successfulSubmit ? (
              <div className={classes.loading}></div>
            ) : (
              "Generate Bio"
            )}
          </button>
        </div>
      </form>
      {generatedBio && (
        <article className={classes.biography}>
          <div className={classes.bioheader}>
            <span>Generated Biography</span>
          </div>
          <div className={classes.biobody}>{generatedBio}</div>
        </article>
      )}
    </section>
  );
}

export default Form;
