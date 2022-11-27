import styles from "./NoFound.module.scss";

export function NoFound() {
  return (
    <>
      <div className={styles.noFound}></div>
      <h1 className={styles.text}>
        404
        <span className={styles.subtext}>
          опять не знает куда вы хотите попасть..
        </span>
      </h1>
    </>
  );
}

