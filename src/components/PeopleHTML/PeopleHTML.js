import React from 'react';

import './PeopleHTML.css';

export default function PeopleHTML(props) {
  let people = props.people;
  let peopleHTML = null;
  if (people) {
    peopleHTML = people.map((person, i) => {
      return <li key={i}>{person}</li>;
    });
  }
  return <div className='people-container'>{peopleHTML}</div>;
}
