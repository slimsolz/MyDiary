const displayMessage = (message, type = 'success') => {
  document.getElementById('display').className = 'show';
  const alert = document.getElementById('alert');
  switch (type) {
    case 'error':
      document.getElementById('display').style.backgroundColor = '#E74C3C';
      alert.innerHTML = message;
      break;
    case 'serverError':
      document.getElementById('display').style.backgroundColor = '#3498db';
      alert.innerHTML = message;
      break;
    default:
      document.getElementById('display').style.backgroundColor = '#2ecc71';
      alert.innerHTML = message;
      break;
  }
  setTimeout(() => {
    document.getElementById('display').className = '';
  }, 4000);
};
