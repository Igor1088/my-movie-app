import React from "react";

const Section = (props) => (
  <section>
    <h4>{props.heading}</h4>
    {props.children}
  </section>
);

export default Section;
