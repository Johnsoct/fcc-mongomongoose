// Packages
require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGO_URI,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

const personSchema = new mongoose.Schema({
  age: Number,
  favoriteFoods: [String],
  name: {
    type: String,
    required: true,
  }
});

const Person = mongoose.model('Person', personSchema)

const createAndSavePerson = async (done) => {
  const document = new Person({
    age: 34,
    name: 'Steve',
    favoriteFoods: [ 'Tacos', 'Jackie' ]
  })

  await document.save(function (error, data) {

  })

  done(null, document);
};

const createManyPeople = async (arrayOfPeople, done) => {
  const documents = await Person.create(arrayOfPeople)
  done(null, documents);
};

const findPeopleByName = async (personName, done) => {
  const documents = await Person.find({
    name: personName,
  }).exec()
  done(null, documents);
};

const findOneByFood = async (food, done) => {
  const document = await Person.findOne({
    favoriteFoods: { $in: food },
  })
  done(null, document);
};

const findPersonById = async (personId, done) => {
  const document = await Person.findById(personId)
  done(null, document);
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  const person = await Person.findById(personId).exec()

  person.favoriteFoods.push(foodToAdd)

  await person.save()

  done(null, person);
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  const person = await Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  )

  done(null, person);
};

const removeById = async (personId, done) => {
  const deletedPerson = await Person.findByIdAndRemove(personId)

  done(null, deletedPerson);
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  const peopleRemovedOutcome = await Person.remove({ name: nameToRemove })

  done(null, peopleRemovedOutcome);
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  const documents = await Person
      .find({ favoriteFoods: { $in: foodToSearch }})
      .sort({ name: 'asc' })
      .limit(2)
      .select(['name', 'favoriteFoods'])
      .exec()

  done(null, documents);
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
