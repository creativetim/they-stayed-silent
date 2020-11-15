import React from "react";
import CongressJSON from "../../data/congress-116.json";

const displayProof = (recognizedBiden = {}) => {
  const { date = '', proof = '' } = recognizedBiden;

  if (!date || !proof) {
    return <span>-</span>;
  }

  if (date && proof?.type === "Twitter") {
    return (
      <span>
        <a href={proof.url} rel="noreferrer" target="_blank">
          {date}
        </a>
        <br />
        (Twitter)
      </span>
    );
  }

  if (date && proof && !proof.type) {
  return <span>{ proof }</span>
  }
};

export default () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>They Stayed Silent</h1>
      <table>
        <thead>
          <tr>
            <td>
              <strong>Name</strong>
            </td>
            <td>
              <strong>Party</strong>
            </td>
            <td>
              <strong>First comment</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {CongressJSON.map(({ id, name, recognizedBiden, terms }) => {
            const currentTerm = terms[terms.length - 1];

            return (
              <tr key={id.govtrack}>
                <td>{name.official_full}</td>
                <td>{currentTerm.party}</td>
                <td>{displayProof(recognizedBiden)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
