/* Code commented out works together with other code in different files. 
  I left it in for posterity to show different ways to achieve the same goal */

// Variable to handle ID's..
const id = (id) => document.getElementById(id);

// Variable to display user count..
const counter = id('userCount');

id('goToSurvey').addEventListener('click', () => {
  window.location = './html/survey.html';
});

// Get the user data from the server with Ajax..
// $.ajax({
//   type: 'GET',
//   url: "/api/friendsArray",
//   success: function(data) {
//       counter.innerText = `There are currently ${data.length} people listed in our Database!`
//   },
//   error: function(error) {
//       console.log('ahh something broke!', error)
//   }
// });

// Get the user data from the server with Fetch so we don't have to use jQuery && Ajax..
fetch('/api/friendsArray')
  .then(res => res.json())
  .then(data => renderUsercount(data))
  .catch(err => console.error(err));


  function renderUsercount(data) {
    counter.innerText = `There are currently ${data.length} people listed in our Database!`
}