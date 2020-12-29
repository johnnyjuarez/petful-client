import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router';

import Config from '../../config';

import './Adoption.css';

import AnimalHTML from '../AnimalHTML/AnimalHTML';
import PeopleHTML from '../PeopleHTML/PeopleHTML';
import config from '../../config';

export default function Pets() {
  const history = useHistory();
  /*
   * Image of pet
   * Description of pet
   * Name, gender, age, and breed of pet
   * Story of Pet
   */
  // state for pet objects
  const [cat, setCat] = useState({});
  const [dog, setDog] = useState({});
  const [allPeople, updateAllPeople] = useState([]);
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [lastPerson, setLastPerson] = useState(false);
  const [countDown, setCountDown] = useState(false);
  // useEffect for fetching data
  useEffect(() => {
    getPeople();

    // get pets
    fetch(`${config.API_ENDPOINT}/pets`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCat(data.cat);
        setDog(data.dog);
      });
  }, []);

  const getPeople = (cb = () => {}) => {
    fetch(`${config.API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPeople(data);
        cb();
      });
  };

  /**
  useEffect(() => {
    if (isSubmit) {
      fetch(`${Config.API_ENDPOINT}/people`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setPeople(data);
          setIsSubmit(false);
        });
    }
  }, [isSubmit]);

  useEffect(() => {
    let interval;
    if (countDown) {
      if (people.length > 1) {
        interval = setInterval(() => {
          setPeople(people.slice(1));
        }, 5000);
      } else if (people.length === 1) {
        setLastPerson(true);
      }
      return () => clearInterval(interval);
    }
  }, [people]);
  /**/

  // When I am at the front of the line,
  // a new user should be added to the line
  // behind me every five seconds until there
  // are a total of five users in line.
  /**
  const startAddingPeople = (count = 0) => {
    setTimeout(() => {
      setPeople([...people, allPeople.slice(count, 1)]);
      if (people.length < 6) {
        startAddingPeople(++count);
      }
    }, 1000);
  };
  /**/

  // When the user add their remove peple from queue.
  const startDeletingPeople = (people) => {
    setTimeout(() => {
      const cur = people.slice(1);
      setPeople(cur);
      if (people.length > 1) {
        startDeletingPeople(cur);
      } else if (people.length === 1) {
        setLastPerson(true);
        // startAddingPeople();
      }
    }, 1000);
  };

  // 5 second line imitation

  const adoptHandler = (e) => {
    let payLoad = {
      type: e.target.value,
    };
    fetch(`${Config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => {
        history.push(0);
        // slice 0, arr.l
        let newPeopleArr = [...people].pop();
        res.text();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userInputChange = (e) => {
    setPerson(e.target.value);
    setIsSubmit(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let payload = {
      person: person,
    };
    return fetch(`${Config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => {
      setPerson('');
      setIsSubmit(true);
      setCountDown(true);
      getPeople(() => startDeletingPeople(people));
      return res.json();
    });
  };

  return (
    <div className='adoption-container'>
      <h1>Adoption Page</h1>
      <h2>Pets ready for adoption!</h2>
      <p>Line for adoption: </p>
      <ul className='adoption-peopleList'>
        <PeopleHTML people={people} />
      </ul>
      <form className='adoption-form' onSubmit={onSubmit}>
        <label htmlFor='user-input'>Enter Name here: </label>
        <input type='text' onChange={userInputChange} value={person} />
        <input type='submit' />
      </form>
      <AnimalHTML
        catProp={cat}
        dogProp={dog}
        lastPersonProp={lastPerson}
        adopt={adoptHandler}
      />
    </div>
  );
}
