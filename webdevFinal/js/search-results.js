document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = this.querySelector('input').value;
    if (query) {
        // Store search in the backend
        fetch('search-history.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        // Redirect to the search results page
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
    }
});

// Show search history when typing
const searchInput = document.querySelector('form[role="search"] input');
searchInput.addEventListener('input', function () {
    const query = this.value;
    if (query) {
        fetch('search-history.php?q=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                // Create a dropdown or list below the input field
                const dropdown = document.getElementById('search-history-dropdown') || document.createElement('ul');
                dropdown.id = 'search-history-dropdown';
                dropdown.style.position = 'absolute';
                dropdown.style.backgroundColor = 'white';
                dropdown.style.border = '1px solid #ccc';
                dropdown.style.width = this.offsetWidth + 'px';
                dropdown.innerHTML = '';

                data.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    li.style.cursor = 'pointer';
                    li.style.padding = '5px';
                    li.addEventListener('click', () => {
                        searchInput.value = item;
                        dropdown.innerHTML = ''; // Hide the dropdown
                    });
                    dropdown.appendChild(li);
                });

                this.parentNode.appendChild(dropdown);
            });
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
