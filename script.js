const Library = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//add book to library

const addBookBtn = document.getElementById("addBookBtn");

addBookBtn.addEventListener("click", addBookToLibrary);

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;

    if (title === "" || author === "" || isNaN(pages) || pages <= 0) {
        alert("Please fill in all fields correctly.");
        return;
    }

    displayForm();
    Library.push(new Book(title, author, pages, read));
    console.log(Library);
    hideLibrary();
    displayLibrary();
    libraryOn = true;
}

// display form 

let formOn = false;

const displayFormBtn = document.getElementById("displayFormBtn");

displayFormBtn.addEventListener("click", displayForm);

function displayForm() {
    const form = document.getElementById("addBookForm");
    if (!formOn) {
        form.style.display = "block";
        formOn = true;
    } else {
        form.style.display = "none";
        formOn = false;
        form.reset();
    }
}

// toggle Library

let libraryOn = false;

const toggleLibraryBtn = document.getElementById("toggleLibraryBtn");

toggleLibraryBtn.addEventListener("click", toggleLibrary);

function toggleLibrary() {
    if (Library.length === 0) {
        return;
    }
    if (!libraryOn) {
        displayLibrary();
        libraryOn = true;
    } else {
        hideLibrary();
        libraryOn = false;
    }
}

function displayLibrary() {
    const library = document.getElementById("library");
    for (const book of Library) {
        const bookCard = document.createElement("div")
        bookCard.setAttribute("class", "book");
        bookCard.innerHTML = `
        <div>
            Title: ${book.title}
        </div>
        <div>
            Author: ${book.author}
        </div>
        <div>
            Pages: ${book.pages}
        </div>
        <div>
            Read: ${book.read}
        </div>
        <button>Remove</button>`
        bookCard.querySelector("button").addEventListener("click", () => { removeBook(book.id) });
        library.appendChild(bookCard);
        toggleLibraryBtn.innerText = `Hide Library`;
    }
}

function hideLibrary() {
    const library = document.getElementById("library");

    while (library.firstChild) {
        library.removeChild(library.firstChild);
        toggleLibraryBtn.innerText = `Show Library`;
    }
}

// remove book 

function removeBook(bookId) {
    const index = Library.findIndex(book => book.id === bookId);
    if (index !== -1) {
        Library.splice(index, 1);
    }
    if (Library.length === 0) {
        hideLibrary();
        
    } else {
        hideLibrary();
        displayLibrary();
    }
}