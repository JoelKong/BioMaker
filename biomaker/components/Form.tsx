import classes from "./form.module.css";

function Form(): JSX.Element {
  return (
    <section className={classes.formsectionn}>
      <form>
        <div>
          <p>What skillsets do you want in your biography?</p>
          <textarea />
        </div>
        <div>
          <p>
            What kind of style would you want your biography to be written in?
          </p>
        </div>
        <div>
          <p>{`Word Count (Optional)`}</p>
          <input />
        </div>
        <button>Generate Bio</button>
      </form>
    </section>
  );
}

export default Form;
