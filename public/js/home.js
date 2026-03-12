const id = (id) => document.getElementById(id);

id('goToSurvey').addEventListener('click', () => {
  window.location = '/survey';
});