/**
 * Simple API server to pass through calls to themoviedb
 */
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = 4000;

const API_KEY = process.env.API_KEY;
console.log(API_KEY);

if (API_KEY === undefined || API_KEY === null) {
  console.error('No API KEY found in .env file. Exiting.');
  process.exitCode = 1;
  process.exit();
}

const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

app.use(cors());

app.get('/api/v1/popular', async (req, res) => {
  let response = {};
  try {
    const results = await axios.get(popular);
    // console.log(results);
    response = results.data;
  } catch (e) {
    response = { hasError: true };
    console.error(e);
  }
  res.send(response);
});

app.get('/api/v1/movie', async (req, res) => {
  let response = {};
  try {
    const id = req.query.id;
    const results = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
      ),
    ]);
    // Map the responses
    response = {
      ...results[0].data,
      ...results[1].data,
    };
  } catch (e) {
    response = { hasError: true };
    console.error(e);
  }
  res.send(response);
});

app.get('/api/v1/search', async (req, res) => {
  const { query } = req.query;
  let response = {};
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    response = results.data;
  } catch (e) {
    response = { hasError: true };
    console.error(e);
  }
  res.send(response);
});
app.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  return console.log(`Server is listening on ${port}`);
});
