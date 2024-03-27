const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject('I could not find that file');
      resolve(data);
    });
  });
};

const wreiteFilePro = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject('could not write file');
      resolve('success');
    });
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    // console.log(`Breed ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    // console.log(res.body);
    let result = res.body.message;
    return wreiteFilePro(`${__dirname}/dog-image.txt`, result);
  })
  .then(() => {
    console.log('Random dog images saved to file ');
  })
  .catch((err) => console.log(err));
