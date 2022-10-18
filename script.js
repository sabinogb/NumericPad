/* Function to add a button to the main buttons container. */
function addButton(id, classList, innerText)
{
	var buttonsContainer = document.getElementById("main-buttons-container");
	
	var button = document.createElement("BUTTON");
	
	button.id = id.toString();
	
	for(var i = 0; i < classList.length; i++)
		button.classList += classList[i];
	
	button.innerText = innerText;
	
	buttonsContainer.appendChild(button);

	return button;
}

/* Function to align vertically. */
function centerVertically(id)
{
	var element = document.getElementById(id);

	var innerHeight = window.innerHeight;

	element.style.top = (innerHeight / 2) - (element.offsetHeight/2) + "px";
}

const MAX = 8;

var input = "";
var hidden = false;

/* Function to update the number shown in the numeric pad's display. */
function updateDisplay(displayId)
{
	if(hidden)
	{
		var toDisplay = "";
			
		for(var i = 0; i < input.length; i++)
			toDisplay += '*';
		
		document.getElementById(displayId).innerText = toDisplay;
	}
	else
	{
		document.getElementById(displayId).innerText = input;
	}
}

document.addEventListener("DOMContentLoaded", function(){

	/* Add buttons from 1 to 9. */
    for(var i = 1; i <= 9; i++)
    {
        addButton(i, ["numerical"], i.toString());
    }

	/* Add a CLEAR, 0 and BACKSPACE button. */
	var clearButton = addButton("CLEAR", ["clear"], "CE");
	addButton(0, ["numerical"], "0");
	var backspaceButton = addButton("BACKSPACE", ["backspace"], "⌫");

	/* Numerical buttons (0-9) appends a digit to the input string on click. */
    for(var i = 0; i <= 9; i++)
	{
		var button = document.getElementById(i.toString());
		button.addEventListener("click", function(){
			if(input.length >= MAX)
				return;

			input += this.id;
			updateDisplay("number-display");
		});
	}

	/* The clear buttons clear everything. */
	clearButton.addEventListener("click", function(){
		input = "";
		updateDisplay("number-display");
	});

	/* The backspace button deletes the last digit. */
	backspaceButton.addEventListener("click", function(){
		input = input.slice(0, input.length - 1);
		updateDisplay("number-display");
	});

	/* Add a button to hide/show the input number. */
	var hideButton = addButton("HIDE", ["toggle-hide-show"], "HIDE");	

	/* Toggle hide/show. */
	hideButton.addEventListener("click", function(){
		if(hidden)
		{
			hidden = false;
			this.innerText = "HIDE";
			updateDisplay("number-display");
		}
		else
		{
			hidden = true;
			this.innerText = "SHOW";
			updateDisplay("number-display");
		}
	});

	centerVertically("pad");
});

/* Keep the numeric pad centered even if the user resizes the browser's window, or if the user zooms in or out. */
window.addEventListener("resize", function(){
	centerVertically("pad");
});