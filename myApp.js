require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});


const personSchema = new mongoose.Schema({
    name:String,
    age: Number,
    favoriteFoods:[String],
});

let Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
    const person = new Person({
        name: "Terence",
        age: 25, 
        favoriteFoods: ['Burritos', 'Sushi']
    }); 

    person.save((err, data) => {
        if (err) return done(err);
        return done(null, data);
    });
};

let people = [
    {
        name: "Terence",
        age: 25,
        favoriteFoods: ['Burritos', 'Sushi']
    },
    {
        name: "Mei",
        age: 25,
        favoriteFoods: ['Sashimi', 'Sushi']
    }
]; 

const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, data) => {
        if (err) return done(err);
        return done(null, data); 
    }); 
};

createManyPeople(people, (err, data) => {
    if (err) return console.error(err);
    console.log("Created people: ", data);
});

const findPeopleByName = (personName, done) => {
    Person.find({name: personName}, (err, data) => {
        if (err) return done(err); 
        return done(null, data); 
    });
};

const findOneByFood = (food, done) => {
    Person.findOne({favoriteFoods: food}, (err, data) => {
        if (err) return done(err); 
        return done(null, data); 
    }); 
};

const findPersonById = (personId, done) => {
    Person.findById(personId, (err, data) => {
        if (err) return done(err);
        return done(null, data); 
    });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  findPersonById(personId, (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not Found"));

    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
        if (err) return done(data);
        return done(null, updatedPerson); 
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
    
  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true }, 
    (err, person) => {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found")); 
    return done(null, person); 
  });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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