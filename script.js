`use strict`;

const quoteContainer = document.getElementById('quote__container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingAnimation() {
	loader.childNodes.forEach(div => {
		div.hidden = false;
	});
	quoteContainer.hidden = true;
}

function removeLoadingAnimation() {
	quoteContainer.hidden = false;
	loader.childNodes.forEach(div => {
		div.hidden = true;
	});
}

// Show new quote
function newQuote() {
	showLoadingAnimation();
	// Pick a random quote from apiQuotes array
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
	authorText.textContent = quote.author;

	// Check if author field is blank and replace it with 'unknown'
	if (!quote.author) authorText.textContent = 'Unknown';
	else authorText.textContent = quote.author;

	// if (quote.text.length > 120) quoteText.classList.add('long-quote');
	// else quoteText.textContent.remove('long-quote');

	// Set quote, hide loader
	quoteText.textContent = quote.text;
	removeLoadingAnimation();
}

// Get quotes from API
async function getQuotes() {
	showLoadingAnimation();
	const apiURL = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(apiURL);
		apiQuotes = await response.json();
		newQuote();
	} catch (error) {
		getQuotes();
	}
}

// Facebook share quote
// function facebookQuote() {}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
// facebookBtn.addEventListener('click', facebookQuote);

// On load
getQuotes();
