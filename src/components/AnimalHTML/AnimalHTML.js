import React from 'react';
import './AnimalHTML.css';

function AnimalHTML(props) {
  let cat = props.catProp;
  let dog = props.dogProp;
  let lastPerson = props.lastPersonProp;
  let adoptHandler = props.adopt;
  let catHTML;
  const onClickHandler = () => {
    adoptHandler();
  };
  if (cat) {
    catHTML = (
      <div className='cat animal-container'>
        <h3>{cat.name}</h3>
        <img className='animal-image' src={cat.imageURL} alt='cat' />
        <div className='animal-card'>
          <p>{cat.description}</p>
          <p>{cat.gender}</p>
          <p>{cat.age}</p>
          <p>{cat.breed}</p>
          <p>{cat.story}</p>
          <button disabled={!lastPerson} value='cat' onClick={onClickHandler}>
            Adopt
          </button>
        </div>
      </div>
    );
  }
  let dogHTML;
  if (dog) {
    dogHTML = (
      <div className='dog animal-container'>
        <h3>{dog.name}</h3>
        <img className='animal-image' src={dog.imageURL} alt='dog' />
        <div className='animal-card'>
          <p>{dog.description}</p>
          <p>{dog.gender}</p>
          <p>{dog.age}</p>
          <p>{dog.breed}</p>
          <p>{dog.story}</p>
          <button disabled={!lastPerson} value='dog' onClick={adoptHandler}>
            Adopt
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='pet-container'>
      {catHTML}
      {dogHTML}
    </div>
  );
}

export default AnimalHTML;
