const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");
const searchResultsContainer = document.getElementById("search-results");


const searchInput = document.getElementById('search-input');
const suggestionsBox = document.getElementById('search-suggestions');

// Fetch suggestions as the user types
searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        fetch('search-history.php')
            .then(response => response.json())
            .then(history => {
                // Filter suggestions that match the query
                const filteredHistory = history.filter(item =>
                    item.toLowerCase().includes(query.toLowerCase())
                );

                // Display suggestions
                suggestionsBox.innerHTML = filteredHistory.map(item =>
                    `<div class="suggestion-item">${item}</div>`
                ).join('');

                // Add click event to suggestions
                document.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('click', function () {
                        searchInput.value = this.textContent;
                        suggestionsBox.innerHTML = ''; // Clear suggestions
                    });
                });
            });
    } else {
        suggestionsBox.innerHTML = ''; // Clear suggestions when input is empty
    }
});

// Store query in history on form submission
document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query.length > 0) {
        fetch('search-history.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `query=${encodeURIComponent(query)}`
        }).then(() => {
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        });
    }
});



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
