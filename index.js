const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
      if (err) {
        return console.log('this is an error!!=>', err.message);
      }
      //console.log(res.body.message);
      let result = res.body.message;

      fs.writeFile(`${__dirname}/dog-image.txt`, result, (err) => {
        if (err) return console.log(err.message);
        console.log('message writenn succefully!!');
      });
    });
});
