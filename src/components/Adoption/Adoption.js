import React, { useState, useEffect } from 'react';
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
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [lastPerson, setLastPerson] = useState(false);
  const [countDown, setCountDown] = useState(false);

  /*
   * Functions for fetches
   */
  const getPeople = () => {
    fetch(`${config.API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPeople(data);
        setIsSubmit(false);
      });
  };

  const getPets = () => {
    fetch(`${config.API_ENDPOINT}/pets`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCat(data.cat);
        setDog(data.dog);
      });
  };

  const addPeople = (person) => {
    let payload = { person };
    fetch(`${Config.API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(() => {
      getPeople();
    });
  };

  // useEffect for fetching data
  useEffect(() => {
    // get people
    getPeople();
    // get pets
    getPets();
  }, []);

  useEffect(() => {
    if (isSubmit) {
      getPeople();
    }
  }, [isSubmit]);

  useEffect(() => {
    let interval;
    let addInterval;
    if (countDown) {
      if (people.length > 1) {
        interval = setInterval(() => {
          randomAdopt();
          // setPeople(people.slice(1));
        }, 5000);
      } else if (people.length === 1) {
        setCountDown(false);
        setLastPerson(true);
        let arrOfPeople = [
          'Bob Burgeoise',
          'Jerry Duck',
          'Gary Winthorpe',
          'David Doe',
          'John Smith',
        ];
        addInterval = setInterval(() => {
          addPeople(arrOfPeople[0]);
          arrOfPeople.shift();
        }, 5000);
      }
      return () => {
        clearInterval(interval, addInterval);
      };
    }
  }, [people]);

  // 5 second line imitation

  // function to handle random deletes/adopts
  const randomAdopt = () => {
    let arrOfTypes = ['cat', 'dog'];
    let randomTypeSelect =
      arrOfTypes[Math.floor(Math.random() * arrOfTypes.length)];
    console.log(randomTypeSelect);
    let payload = {
      type: randomTypeSelect,
    };
    fetch(`${Config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(() => {
      getPeople();
      getPets();
      setLastPerson(false);
    });
  };

  const adoptHandler = (e) => {
    let payLoad = {
      type: e.target.value,
    };
    console.log(e.target.value);
    fetch(`${Config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => {
        // getPeople();
        // getPets();
        // setLastPerson(false);
        history.push('/congratulations');
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
