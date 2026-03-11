/* Code commented out works together with other code in different files. 
  I left it in for posterity to show different ways to achieve the same goal */

// Variable to handle ID's..
const id = (id) => document.getElementById(id);
const surveyForm = id('surveyForm');

id('homeBtn').addEventListener('click', () => {
  window.location = '../index.html';
});

// Survey Questions..
const questions = [
  'Do you like dogs?',
  'Do you like mexican food?',
  'Do you like reading books?',
  'Do you like camping?',
  'Do you like art?',
  'Do you like dancing?',
  'Do you like cats?',
  'Do you like music?',
  'Do you like the beach?',
  'Do you like hiking?',
];

// Insert questions and options for users to browser..
const survey = () => questions.forEach((question, index) => {
  surveyForm.insertAdjacentHTML('beforeend',
    `<div class="divider my-5"></div>
   <div id="question${index}" class="surveyText px-5">
    <h4 class="text-center">${question}</h4>
   </div>
   <div class="radioGroup text-center mb-5">
      <input id="form1row${index}" type="radio" name="userInput${index}" value="1"/>
        <label for="form1row${index}">Strongly Disagree</label>
      <input id="form2row${index}" type="radio" name="userInput${index}" value="2"/>
        <label for="form2row${index}">Disagree</label>
      <input id="form3row${index}" type="radio" name="userInput${index}" value="3" checked />
        <label for="form3row${index}">No Preference</label>
      <input id="form4row${index}" type="radio" name="userInput${index}" value="4"/>
        <label for="form4row${index}">Agree</label>
      <input id="form5row${index}" type="radio" name="userInput${index}" value="5"/>
        <label for="form5row${index}">Strongly Agree</label>
    </div>  `);
});

// Function to render questions..
survey();

// Functionality for username and img submition..
surveyForm.insertAdjacentHTML('beforeend',
  `<div id="namePhotoContainer" class="text-center">
    <div class="d-flex justify-content-between">
      <div class="form-group form-floating m-2 w-75">
        <input name="name" class="pointer form-control" type="text" placeholder="Enter Name Here" required />
        <label for="name">Enter Name Here</label>
      </div>
      <div class="form-group form-floating m-2 w-75">
        <input id="urlField" name="photo" class="pointer form-control" type="text" placeholder="Enter Photo URL" required />
        <label for="photo">Enter Photo URL Here</label>
      </div>
    </div>
      <button class="btn btn-info text-dark m-2 w-75" type="submit">Submit</button>
   </div> `);

// // Function to Submit answers and compare with friends.json and match users..
// surveyForm.addEventListener('submit', event => {
//   event.preventDefault();
//   const form = event.target;

//   let userInputValues = {
//     name: form.elements.name.value,
//     photo: form.elements.photo.value,
//     scores: [
//       +form.elements.userInput0.value,
//       +form.elements.userInput1.value,
//       +form.elements.userInput2.value,
//       +form.elements.userInput3.value,
//       +form.elements.userInput4.value,
//       +form.elements.userInput5.value,
//       +form.elements.userInput6.value,
//       +form.elements.userInput7.value,
//       +form.elements.userInput8.value,
//       +form.elements.userInput9.value
//     ]
//   };

// // Hide the survey and title and show match made..
// $('.match').fadeIn('fast');
// $('.welcome').hide();

// // Shows name and img of user matched with..
// $.post('/api/friendsArray', userInputValues).then(friendsArray => {
//   matchName.innerHTML = `Your Match is ${friendsArray.name}!`;
//   $('#matchPhoto').append(`<div><img id="photoSize" class="rounded" src="${friendsArray.photo}" /></div>`);
// });

// // Shows name and img of user matched with using reduce..
// $.post('/api/friendsArray', userInputValues).then(friendsArray => {
//   matchName.innerHTML = `Your Match is ${friendsArray[0].name}!`;
//   $('#matchPhoto').append(`<div><img id="photoSize" class="rounded" src="${friendsArray[0].photo}" /></div>`);
// });
// });

// Function to Submit answers and compare with friends.json and match users by using fetch so we don't have to use jQuery && Ajax..
surveyForm.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;

  let userInputValues = {
    name: form.elements.name.value,
    photo: form.elements.photo.value,
    scores: [
      +form.elements.userInput0.value,
      +form.elements.userInput1.value,
      +form.elements.userInput2.value,
      +form.elements.userInput3.value,
      +form.elements.userInput4.value,
      +form.elements.userInput5.value,
      +form.elements.userInput6.value,
      +form.elements.userInput7.value,
      +form.elements.userInput8.value,
      +form.elements.userInput9.value
    ]
  };

  // hide the survey and title and show match made..
  id('matchText').classList.remove('hide');
  id('welcomeContainer').classList.add('hide');
  id('surveyContainer').classList.add('hide');

  // Fetch to show name and img of user matched with using reduce..
  try {
    const response = await fetch("/api/friendsArray", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInputValues),
    });

    const data = await response.json();

    matchName.innerHTML = `Your Match is ${data[0].name}!`;
    const div = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('id', 'photosize');
    img.setAttribute('src', `${data[0].photo}`);
    img.className = 'rounded';
    div.appendChild(img);
    id('matchPhoto').appendChild(div)
  } catch (error) {
    // Display a simple error message on the page
    surveyForm.innerHTML = `<p style="color: red;"> An error occurred: ${error.message} </p> `;
    return;
  }
});