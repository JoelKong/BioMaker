import classes from "./header.module.css";

function Header(): JSX.Element {
  return (
    <header className={classes.header}>
      <div className={classes.headerbox}>
        <div>
          <h1 className={classes.brand}>BioMaker</h1>
        </div>
        <h2 className={classes.headersubtitle}>
          Generate Biographies Within Seconds
        </h2>
      </div>
    </header>
  );
}

export default Header;
