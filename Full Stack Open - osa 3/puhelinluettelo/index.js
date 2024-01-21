require('dotenv').config();
const Person = require('./models/persons');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('req_data', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req_data'));

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people<br><br>${new Date()}`);
    })
    .catch(err => next(err));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons);
    })
    .catch(err => next(err));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      person ? res.json(person) : res.status(404).end();
    })
    .catch(err => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const newPerson = req.body;

  if (!newPerson.name) {
    res.status(400).json({ error: 'name required' });
    return;
  } else if (!newPerson.number) {
    res.status(400).json({ error: 'number required' });
    return;
  }

  Person.find({ name: newPerson.name })
    .then(existingPersons => {
      if (existingPersons.length > 0) {
        res.status(409).json({ error: `person with name '${newPerson.name}' already exists` });
      } else {
        new Person(newPerson)
          .save()
          .then(savedPerson => res.json(savedPerson))
          .catch(err => next(err));
      }
    });
});

app.put('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndUpdate(
    req.params.id,
    { number: req.body.number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(removedPerson => {
      removedPerson ? res.send(204).end() : res.send(404).end();
    })
    .catch(err => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    res.status(400).send({ error: 'invalid id' });
  } else if (err.name === 'ValidationError') {
    res.status(400).send({ error: err.message });
  } else {
    res.status(500).end();
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});