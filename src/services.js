import config from './config';

const APIServices = {
  getPeople() {
    fetch(`${config.API_ENDPOINT}/people`).then((res) => {
      console.log(res);
      return res.json();
    });
  },
  getPets() {},
  postPerson() {},
};

export default APIServices;
