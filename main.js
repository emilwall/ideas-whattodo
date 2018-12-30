var ideas = [];
var taken = [];
var last = -1;
var html = document.querySelector('html');
var log = document.getElementById('whattodo');

var xhr = new XMLHttpRequest();
var accessToken = "[Your access token here]";
var clientId = "39c8599abba8ddc89d45"; // TODO your client id here
var listId = 379138641; // TODO your list id here
var url = 'https://cors-anywhere.herokuapp.com/' +
          'https://a.wunderlist.com/api/v1/tasks?list_id=' +
          listId + '&completed=false';
xhr.open('GET', url, true);
xhr.setRequestHeader("X-Access-Token", accessToken);
xhr.setRequestHeader("X-Client-ID", clientId);
xhr.onreadystatechange = function () {
  if(xhr.readyState === 4 && xhr.status === 200) {
    ideas = JSON.parse(xhr.responseText).map(item => item.title);
    propose();
  }
};
xhr.send();

var propose = function() {
  var i = Math.floor(Math.random() * ideas.length);

  if (taken.length === ideas.length && last !== -1) {
    taken = [last];
  }

  while (taken.indexOf(i) !== -1) {
    i = Math.floor(Math.random() * ideas.length);
  }
  taken.push(i);
  last = i;

  log.textContent = ideas[i] || "Laddar...";
};

html.addEventListener('keydown', propose);
html.addEventListener('click', propose);
document.body.addEventListener('touchstart', propose, false);
propose();
