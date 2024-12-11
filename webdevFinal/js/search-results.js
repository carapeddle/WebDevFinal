const searchInput = document.querySelector('.form-control[aria-label="Search"]');
const suggestionsBox = document.querySelector('.suggestions-box');

// Function to fetch and display search history
function fetchSearchHistory(query) {
    if (!query) {
        suggestionsBox.innerHTML = ''; // Clear suggestions if input is empty
        return;
    }

    fetch('search-history.php?q=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            suggestionsBox.innerHTML = ''; // Clear previous suggestions
            if (data.length > 0) {
                data.forEach(item => {
                    const suggestionItem = document.createElement('div');
                    suggestionItem.classList.add('suggestion-item');
                    suggestionItem.textContent = item;
                    suggestionItem.addEventListener('click', () => {
                        searchInput.value = item; // Fill input with clicked suggestion
                        suggestionsBox.innerHTML = ''; // Clear suggestions box
                    });
                    suggestionsBox.appendChild(suggestionItem);
                });
            }
        })
        .catch(error => console.error('Error fetching search history:', error));
}

// Event listeners for search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    fetchSearchHistory(query);
});

// Close suggestions box when clicking outside
document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !suggestionsBox.contains(event.target)) {
        suggestionsBox.innerHTML = ''; // Clear suggestions
    }
});













const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const searchResultsContainer = document.getElementById("search-results");

// Check if query exists
if (query) {
    const matchingBooks = books.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    // Display matching books or "no results" message
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
