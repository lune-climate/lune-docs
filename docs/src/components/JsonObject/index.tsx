import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Parameter from "../Parameter";

export default function JsonObject(props: { json: string }): JSX.Element {
  const json = JSON.parse(props.json);
  return (
    <section className={styles.features}>
      <div className="container">
        <Parameter
          {...{
            name: json.name,
            metadata: json,
            required: json.required,
            discriminator: json.discriminator,
          }}
        />
        <div className="row">
          Showing full parsed JSON for JsonObject:{" "}
          {JSON.stringify(json, null, 2)}
        </div>
      </div>
    </section>
  );
}
