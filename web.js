function makeColourChanger(col) {
  return function(e) {
    document.getElementById("colour-square").style.backgroundColor = col;
  };
}

function showError() {
  errorMessage.style.display = "block";
}

function showSuccess() {
  localStorage.setItem("colour", getSelectedColour());
  okMessage.style.display = "block";
}

function getSelectedColour() {
  var radios = document.getElementsByName("colour");
  var colour = null;
  for (i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      colour = radios[i].value;
      break;
    }
  }
  document.getElementById("chosen-colour-name").innerText = colour;
  return colour;
}

function getCookieColour() {
  var cookie = localStorage.getItem("colour");
  if (cookie == "red" || cookie == "green" || cookie == "blue") {
    return cookie;
  } else {
    return null;
  }
}

function disableForm() {
  var radios = document.getElementsByName("colour");
  for (var i = 0; i < radios.length; i++) {
    radios[i].disabled = true;
  }
  document.getElementById("submit").disabled = true;
}

function hideVoting() {
  document.getElementById("form-row").style.display = "none";
}

function showVoting() {
  document.getElementById("form-row").style.display = "block";
}

function vote(ev) {
  ev.preventDefault();

  var colour = getSelectedColour();

  disableForm();

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "/vote", true);

  xhr.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        showSuccess();
        document.cookie = colour;
      } else {
        showError();
      }
    }
  };

  xhr.send("colour=" + colour);

  hideVoting();
}

const colours = {
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF"
};

const okMessage = document.getElementById("ok-message-row");
const errorMessage = document.getElementById("error-message-row");

document
  .getElementById("red")
  .addEventListener("click", makeColourChanger(colours["red"]));
document
  .getElementById("green")
  .addEventListener("click", makeColourChanger(colours["green"]));
document
  .getElementById("blue")
  .addEventListener("click", makeColourChanger(colours["blue"]));

document.getElementById("form").addEventListener("submit", vote);

document.body.onload = function() {
  var colour = getCookieColour();

  if (colour == null) {
    colour = getSelectedColour();
    showVoting();
  } else {
    hideVoting();
    showSuccess();
  }

  makeColourChanger(colours[colour])();
};
