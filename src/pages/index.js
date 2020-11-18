import React from "react";
import CongressJSON from "../../data/congress-116.json";

import "../app.css";
import githubLogo from "../../public/github.png";

const displayProof = (recognizedBiden = {}) => {
  const { date = "", lastChecked = "", proof = "" } = recognizedBiden;

  if (!date || !proof) {
    return <span>-</span>;
  }

  if (date && proof?.type === "Twitter") {
    return (
      <span>
        <a href={proof.url} rel="noreferrer" target="_blank">
          {date}
        </a>
      </span>
    );
  }

  if (date && proof && !proof.type) {
    return <span>{proof}</span>;
  }
};

export default () => {
  return (
    <main>
      <h1>They Stayed Silent</h1>
      <p className="intro">
        &ldquo;...Americans are gonna count something else starting right now.
        They&rsquo;re gonna count who was willing to speak up against Donald
        Trump trying to kill democracy. And they&rsquo;ll count who will stay
        silent in the face of this desparete attack of the bedrock insitution of
        this truly great nation. &lsquo;Cause he just attacked{" "}
        <em>the thing</em> that makes us so great and it is time for you all to
        mean what your hats have been yelling.&rdquo;
        <br />
        <br />
        <small>
          Excerpt from Stephen Colbert&rsquo;s 11/05/20&nbsp;
          <a
            href="https://www.youtube.com/watch?v=TeSiJmLoJd0"
            rel="noreferrer"
            target="_blank"
          >
            monologue
          </a>{" "}
          (quote begins at 5:23)
        </small>
      </p>
      <hr />
      <table>
        <thead>
          <tr>
            <td align="left">
              <strong>Name</strong>
            </td>
            <td>
              <strong>Party</strong>
            </td>
            <td className="twenty">
              <strong>First comment</strong>
            </td>
            <td className="twenty">
              <strong>Last checked</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {CongressJSON.map(({ id, name, recognizedBiden, terms }) => {
            const currentTerm = terms[terms.length - 1];

            return (
              <tr key={id.govtrack}>
                <td align="left">{name.official_full}</td>
                <td>{currentTerm.party}</td>
                <td>{displayProof(recognizedBiden)}</td>
                <td>{recognizedBiden?.lastChecked || "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr />
      <a
        href="https://github.com/creativetim/they-stayed-silent"
        rel="noreferrer"
        target="_blank"
      >
        <img
          src={githubLogo}
          alt="@creativetim/they-stayed-silent"
          width="16"
        />
      </a>
    </main>
  );
};
