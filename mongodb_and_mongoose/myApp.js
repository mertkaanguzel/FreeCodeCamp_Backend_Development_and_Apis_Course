/*
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
*/
const mongoose = require('mongoose');
require('./database');

let Person = require('./models/person');

const createAndSavePerson = (done) => {

  let personInstance = new Person({
    name : 'Mert Kaan Guzel',
    age : 23,
    favoriteFoods : ['fish', 'turkey', 'pea']
  });

  personInstance.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

};

const findPeopleByName = (personName, done) => {
  Person.find({name : personName}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });

};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findOne(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
/*done(null , data);
  Person.findOneAndUpdate(
    {name : personName},
    {age : ageToSet},
    {new : true}
  )
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    return console.error(err);
  })
  */
  Person.findOneAndUpdate(
  {
    name : personName
  },
  {
    age : ageToSet
  },
  {
    new : true
  },
  (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name : nameToRemove}, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods : foodToSearch})
        .sort({name : 1})
        .limit(2)
        .select('-age')
        .exec((err, data) => {
          if (err) return console.error(err);
          done(null, data);
        });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
