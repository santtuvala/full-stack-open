require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Mongoose connected'))
  .catch((err) => console.error('Mongoose connection error:', err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (val) => {
        // if any non-number character besides '-' is found, it's invalid
        if (isNaN(val.replaceAll('-', ''))) return false;

        // check if '-' exists and if first digits are 2||3
        let numParts = val.split('-');

        if (numParts.length === 1) {
          // no -
          return true;
        } else if (numParts.length === 2) {
          // 1 -
          return numParts[0].length === 2 || numParts[0].length === 3;
        } else {
          // multiple -
          return false;
        }
      },
      // message: (props) => {
      //     return 'invalid value';
      // }
    },
  },
});

personSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString();
    delete retObj._id;
    delete retObj.__v;
  },
});

module.exports = mongoose.model('person', personSchema);