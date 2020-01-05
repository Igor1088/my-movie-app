import React from "react";
import CreditsList from "./CreditsList";

const Credits = props => {
  const { creditsCast, creditsCrew, media, heading } = props;

  return (
    <div>
      <CreditsList
        credits={creditsCast ? creditsCast : null}
        media={media}
        heading="Acting"
      />
      <CreditsList
        credits={
          creditsCrew
            ? creditsCrew.filter(c => c.department === "Directing")
            : null
        }
        media={media}
        heading="Directing"
      />
      <CreditsList
        credits={
          creditsCrew
            ? creditsCrew.filter(c => c.department === "Production")
            : null
        }
        media={media}
        heading="Production"
      />
      <CreditsList
        credits={
          creditsCrew
            ? creditsCrew.filter(c => c.department === "Writing")
            : null
        }
        media={media}
        heading="Writing"
      />
    </div>
  );
};

export default Credits;
