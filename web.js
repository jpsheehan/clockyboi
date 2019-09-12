function makeColourChanger(colourName, colourCode) {
  return function(ev) {
    if (ev && ev.preventDefault) {
      ev.preventDefault();
    }

    selectedColour = colourName;
    updateColourSquare();
  };
}

function showError() {
  errorMessage.style.display = "block";
}

function showSuccess() {
  localStorage.setItem("colour", getSelectedColour());
  document.getElementById("chosen-colour-name").innerText = getSelectedColour();
  okMessage.style.display = "block";
}

function getSelectedColour() {
  if (selectedColour === null) {
    selectedColour = getCookieColour();
    if (selectedColour === null) {
      selectedColour = "red";
    }
  }
  return selectedColour;
}

function updateColourSquare() {
  document.getElementById(
    "colour-square"
  ).style.backgroundColor = selectedColour;
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
  document.getElementById("red").disabled = true;
  document.getElementById("green").disabled = true;
  document.getElementById("blue").disabled = true;
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

var selectedColour = null;

document
  .getElementById("red")
  .addEventListener("click", makeColourChanger("red", colours["red"]));
document
  .getElementById("green")
  .addEventListener("click", makeColourChanger("green", colours["green"]));
document
  .getElementById("blue")
  .addEventListener("click", makeColourChanger("blue", colours["blue"]));

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

  updateColourSquare();
};
