const express = require('express');
const request = require('request');

const router = express.Router();
const base = process.env.URL;
const key = '3b3aZE2wiiokLZ1lMB7hRO8ZlglL3ORs';

/* GET participants */
router.get('/participators', (req, res, next) => {
  const query = req.query.query.trim();
  const options = {
    url: `${base}/participators?query=${query}`,
    headers: { key },
  };
  request(options, (error, response, body) => {
    if (error) {
      res.send([]);
    } else if (body) {
      try {
        const json = JSON.parse(body);
        res.send(json);
      } catch (err) {
        res.send([]);
      }
    } else {
      res.send([]);
    }
  });
});

/* GET winners */
router.get('/winners', (req, res, next) => {
  const query = req.query.query.trim();
  const options = {
    url: `${base}/winners?query=${query}`,
    headers: { key },
  };
  request(options, (error, response, body) => {
    if (error) {
      res.send([]);
    } else if (body) {
      try {
        const json = JSON.parse(body);
        res.send(json);
      } catch (err) {
        res.send([]);
      }
    } else {
      res.send([]);
    }
  });
});

/* GET home page */
router.get('/', (req, res, next) => {
  const options = {
    url: `${base}/data`,
    headers: { key },
  };
  request(options, (error, response, body) => {
    if (error) {
      res.render('oops');
    } else if (body) {
      try {
        const json = JSON.parse(body);
        res.render('index', json);
      } catch (err) {
        res.render('oops');
      }
    } else {
      res.render('oops');
    }
  });
});

module.exports = router;
