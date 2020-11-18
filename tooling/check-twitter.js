// This is a mess :)

const dayjs = require("dayjs");
const inquirer = require("inquirer");
const _slice = require("lodash/slice");

const Congress = require("../data/congress-116.json");
const Socials = require("../data/legislators-social-media.json");

const getUnconfirmed = () => {
  const unconfirmed = Congress.filter((person) => {
    const hasBeenChecked = Boolean(person?.recognizedBiden?.lastChecked);

    if (hasBeenChecked) {
      // Have we not checked in the last day?
      return (
        Math.abs(
          dayjs(person.recognizedBiden.lastChecked).diff(dayjs(), "day")
        ) > 0
      );
    }

    const noDate = !person?.recognizedBiden?.date;
    return noDate;
  });
  const unconfirmedWithSocials = unconfirmed.reduce((acc, cur) => {
    const govtrackId = cur.id.govtrack;
    let social;
    let socialObj = Socials.find((person) => person.id.govtrack === govtrackId);

    if (!socialObj) {
      // console.log(`Cannot find match for ${cur.name.official_full}`);
      social = {};
    } else {
      social = socialObj.social;
    }

    acc.push({
      ...cur,
      id: {
        ...cur.id,
        social,
      },
    });

    return acc;
  }, []);

  return unconfirmedWithSocials;
};

// const first = unconfirmedWithSocials[0];

// console.log(`https://twitter.com/${first.id.social.twitter}`);

inquirer
  .prompt([
    {
      message: "How many Congresspeople do you want to check out?",
      name: "batchSize",
      type: "number",
    },
  ])
  .then((answer) => {
    const unconfirmed = getUnconfirmed();
    const batchSize = answer.batchSize > 20 ? 20 : answer.batchSize;
    const people = _slice(unconfirmed, 0, batchSize);

    inquirer
      .prompt(
        people.map((person) => {
          return {
            message: `Check out: https://twitter.com/${person.id.social.twitter}; Have they acknolwedged Biden's win?`,
            name: `haveThey-${person.id.govtrack}`,
            type: "confirm",
          };
        })
      )
      .then(console.log);
  });
