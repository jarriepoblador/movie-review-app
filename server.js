const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//importing all routes
const user = require('./src/routes/user')
const auth = require('./src/routes/auth')
const upload = require('./src/routes/upload')
const movie = require('./src/routes/movie')
const review = require('./src/routes/review')
const recommendation = require('./src/routes/recommendation')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json())

//mongodb connection
mongoose.connect('mongodb://localhost/movie-review-database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch((err) => {
  console.log('Failed to connect to MongoDB database', err);
});

const db = mongoose.connection

//check if mongodb connected
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

//Routes
app.use(user);
app.use(auth);
app.use(upload);
app.use(movie);
app.use(review);
app.use(recommendation);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
