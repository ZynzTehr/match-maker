const { log } = console;
/* Code commented out works together with other code in different files. 
  I left it in for posterity to show different ways to achieve the same goal */
const express = require('express');
const path = require('path');
const bp = require('body-parser');
// const fs = require('fs');
const app = express();
let router = express.Router();

// Port for server..
const PORT = process.env.PORT || 7000;

// Import friendsArray.json data..
const friendsArray = require('./app/data/friends.json');

// Middleware..
app.use(bp.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static((path.join(__dirname, '/public'))));


app.get('/survey', (req, res) => {
  res.sendFile(path.join(__dirname + 'public/survey.html'))
});


// GET function for survey and friends array data storage..
router.get('/api/friendsArray', (req, res) => {
  res.sendFile(path.join(__dirname + '/app/data/friends.json'))
});

// Friend match maker..
// app.post('/api/friendsArray', (req, res) => {
//   const newFriend = req.body;
//   let match;
//   let score = 100;

//   // Loops to find a match..
//   for (let friend in friendsArray) {
//     let tmp = 0;
//     for (let n = 0; n < 10; ++n) {
//       tmp += Math.abs(+newFriend.scores[n] - friendsArray[friend].scores[n]);
//     }
//     if (tmp < score) {
//       score = tmp;
//       match = friendsArray[score];
//     }
//   }

//   // friendsArray.push and fs.write are used to add new user into friends.json file 
//   friendsArray.push(newFriend);
//   fs.writeFile(path.join(__dirname + '/app/data/friends.json'), JSON.stringify(friendsArray, null, 2), err => {
//     if (err) throw err;
//   });

//   // Send response back to survey.js to append match and photo to browser..
//   res.send(match);
// });

// Friend match with reduce..
app.post('/api/friendsArray', (req,res) => {
  let valueToMatch;
  let newUser = req.body;
  let surveyScores = newUser.scores.reduce((x, y) => (+x) + (+y));
  
  let findMatches = friendsArray.map(elem => new Array(elem.name, elem.scores)
  .reduce((acc,userValues) => {
    valueToMatch = userValues.reduce((x, y) => x + y)
    return userValues ? [`${acc}`, `${Math.abs(valueToMatch - surveyScores)}`] : null;
  }));
  let sortMatch = findMatches.reduce((x, y) => {
    return x[1] < y[1] ? [x[0], x[1]] : [y[0], y[1]];
  });
  
  let filterMatch = friendsArray.filter(elem => elem.name === sortMatch[0]);
  friendsArray.push(newUser);
  res.send(filterMatch);
});

app.use(router);

app.listen(PORT, () => {
  log(`Server running on PORT: http://localhost:${PORT} \n holding down " control + C " will stop the server`);
});