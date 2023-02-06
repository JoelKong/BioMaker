import classes from "./form.module.css";

function Form(): JSX.Element {
  return (
    <section className={classes.formsection}>
      <form className={classes.form}>
        <div>
          <p>What skillsets do you want in your biography?</p>
          <input className={classes.forminput} placeholder="hi" />
        </div>
        <div>
          <p className={classes.formquestion}>
            What style would you want your biography to be written in?
          </p>
          <input className={classes.forminput} />
        </div>
        <div>
          <p className={classes.formquestion}>{`Word Count (Optional)`}</p>
          <input className={classes.forminput} />
        </div>
        <div className={classes.formbuttondiv}>
          <button className={classes.formbutton}>Generate Bio</button>
        </div>
      </form>
    </section>
  );
}

export default Form;
