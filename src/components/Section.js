import React from "react";

const Section = (props) => (
  <section>
    {props.heading ? <h4>{props.heading}</h4> : null}
    {props.children}
  </section>
);

export default Section;
