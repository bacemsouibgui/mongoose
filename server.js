const mongoose = require('mongoose');
//require("dotenv").config();

//Connecting to the Server of my Database
mongoose.connect(MONGO_URI='mongodb://127.0.0.1:27017/DB', { useNewUrlParser: true, useUnifiedTopology: true });


// Creating a Collection of a Person
let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
});

// Model creation

const Person = mongoose.model('person', personSchema);

// Create first record in a Person Model

const firstPerson = new Person({
    name: 'Ahmed',
    age: 27,
    favoriteFoods: ['pizza']
})

firstPerson.save((err, data) => {
    err ? console.error(err) : console.log(`${firstPerson.name} data is saved`)
})

// Create Many record in a Person Model

Person.create([
    {
        name: 'karim',
        age: 25,
        favoriteFoods: ["humberger"]
    },

    {
        name: 'mariem',
        age: 28,
        favoriteFoods: ['spagetti']
    },

    {
        name: 'rihab',
        age: 22,
        favoriteFoods: ['lasagne']
    }
], err => {
    err ? console.error(err) : console.log('Your Records are Added Successfuly')
}
)

// Find all the people having a given name

Person.find({ name: 'Ahmed' }, (err, data) => {
    err ? console.error(err) : console.log(`There are ${data.length} person having name = Ahmed`)
})

//FindOne operation by favorite food

Person.findOne({ favoriteFoods: '' }, (err, data) => {
    err ? console.error(err) : console.log(`${data.name} like pizza`)
})

// Find a Model by ID

Person.findById("604ea6a0a25625a2f45dccce", (err, data) => {
    err ? console.error(err) : console.log("we find the person with ID:" + data._id)
})

// Find and update a Model

Person.findByIdAndUpdate("604ea6a0a25625a2f45dccce", { $push: { favoriteFoods: "hamburger" } }, (err, data) => {
    if (err) { console.error(err); }
    else {
        data.save((err, doc) => {
            err ? console.error(err) : console.log('Your Data was Updated' + doc.favoriteFoods);
        })
    }
})

// Find One and Update 

Person.findOneAndUpdate( { age: '20' }, { new: true }, (err, data) => {
    err ? console.error(err) : console.log('Your data updated ' + data.name + ' ' + data.age + ' years')
})

// Find by Id and Delete the document

Person.findByIdAndRemove("604ea6a0a25625a2f45dccce", (err, data) => {
    err ? console.error(err) : console.log(data._id + ' Document removed')
})

//Delete Many Documents with model.remove()

Person.remove({ name: "Mary" }, (err) => {
    err ? console.error(err) : console.log('All document with name Mary are remved')
})

//Find people who like burrito

Person.find({ favoriteFoods: "burrito" }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec((err, data) => {
    err ? console.error(err) : console.log(data)
});