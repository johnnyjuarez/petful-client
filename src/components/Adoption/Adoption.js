import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Config from '../../config';

import './Adoption.css';

import AnimalHTML from '../AnimalHTML/AnimalHTML';
import PeopleHTML from '../PeopleHTML/PeopleHTML';

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
  // useEffect for fetching data
  useEffect(() => {
    // get people
    fetch('http://localhost:8000/people')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setPeople(data);
      });
    // get pets
    fetch('http://localhost:8000/pets')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCat(data.cat);
        setDog(data.dog);
      });
  }, []);

  useEffect(() => {
    if (isSubmit) {
      fetch(`${Config.API_ENDPOINT}/people`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setPeople(data);
          setIsSubmit(false);
        });
    }
  }, [isSubmit]);

  if (countDown) {
    if (people.length > 1) {
      setTimeout(() => {
        let mutatePeople = [...people];
        mutatePeople.shift();
        console.log(mutatePeople);
        setPeople(mutatePeople);
        if (mutatePeople.length == 1) {
          setLastPerson(true);
        }
      }, 5000);
    }
  }
  // 5 second line imitation

  const adoptHandler = (e) => {
    let payLoad = {
      type: e.target.value,
    };
    console.log(payLoad);
    fetch(`${Config.API_ENDPOINT}/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(payLoad),
    })
      .then((res) => {
        history.push(0);
        let newPeopleArr = [...people].pop();
        console.log(newPeopleArr);
        res.text();
      })
      .then((res) => {
        console.log(res);
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
