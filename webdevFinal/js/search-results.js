const searchInput = document.querySelector('.form-control[placeholder="Search"]');
const suggestionsBox = document.createElement('ul');
suggestionsBox.id = 'search-history-dropdown';
searchInput.parentElement.appendChild(suggestionsBox);

// Fetch history from server when input is focused
searchInput.addEventListener('focus', () => {
    fetch('search-history.php')
        .then(response => response.json())
        .then(history => {
            suggestionsBox.innerHTML = '';
            history.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item;
                listItem.classList.add('suggestion-item');
                listItem.addEventListener('click', () => {
                    searchInput.value = item;
                    suggestionsBox.innerHTML = '';
                });
                suggestionsBox.appendChild(listItem);
            });
        });
});

// Save new search term to the history
document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        fetch('search-history.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ searchTerm: query })
        }).then(() => {
            window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
        });
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
        suggestionsBox.innerHTML = '';
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
