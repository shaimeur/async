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

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(res.body.message);
    await wreiteFilePro(`${__dirname}/dog-image.txt`, res.body.message);
    console.log('Random dog images saved to file ');
  } catch (error) {
    console.log(error);
    throw err;
  }
  return ' 2 :Dogs pics arrived!!';
};

(async () => {
  try {
    console.log('1: will get dogpics');
    const x = await getDogPic();
    console.log(x);
    console.log('3: done');
  } catch (error) {
    console.log('woooow  error occure!!');
  }
})();

/*
consuming the Promise with the then && catch hundler :
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
*/
