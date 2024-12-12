const searchInput = document.querySelector('.form-control[aria-label="Search"]');
const suggestionsBox = document.querySelector('.suggestions-box');

function fetchSearchHistory(query) {
    if (!query) {
        suggestionsBox.innerHTML = ''; 
        return;
    }

    fetch('search-history.php?q=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionsBox.innerHTML = ''; 
            if (data.length > 0) {
                data.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = item;
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = item;
                        suggestionsBox.innerHTML = ''; 
                    });
                    suggestionsBox.appendChild(suggestionItem);
                });
            }
        })
        .catch(error => console.error('Error fetching search history:', error));
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    fetchSearchHistory(query);
});


document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.innerHTML = ''; 
    }
});













const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const searchResultsContainer = document.getElementById("search-results");

if (query) {
    const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    
    if (matchingBooks.length > 0) {
        matchingBooks.forEach(book => {
            const bookElement = document.createElement("div");
            bookElement.classList.add("book", "booksize");
            bookElement.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Genre: ${book.genre}</p>
                <p>Price: $${book.price.toFixed(2)}</p>
                <button type="button" onclick="addToCart(${book.id})">Add to Cart</button>
            `;
            searchResultsContainer.appendChild(bookElement);
        });
    } else {
        searchResultsContainer.innerHTML = "<p>No books found matching your search query.</p>";
    }
} else {
    searchResultsContainer.innerHTML = "<p>Please enter a search query.</p>";
}
