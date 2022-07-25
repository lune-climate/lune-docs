import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Parameter from "../Parameter";

export default function EndpointParser(props: { json: string }): JSX.Element {
  const json = JSON.parse(props.json);
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">Tag: {JSON.stringify(json.tag, null, 2)}</div>
        <div className="row">
          Endpoints: {JSON.stringify(json.endpoints, null, 2)}
        </div>
        <div className="row">Showing JSON: {JSON.stringify(json, null, 2)}</div>
      </div>
    </section>
  );
}
