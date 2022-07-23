// ----------------
// Global variables & Constants:
// ----------------

document.bookForm.finishedPages.setAttribute("max", document.getElementById("total-pages").value);
document.seriesForm.finishedSeasons.setAttribute("max", document.getElementById("total-seasons").value);

let mode = "movies";
let myBooks = [];
let mySeries = [];
let myMovies = [];

const plus = document.getElementById("add-new");
const addCard = document.getElementById("add-card");

const submitMovie = document.getElementById("submit-movie");
const submitSeries = document.getElementById("submit-series");
const submitBook = document.getElementById("submit-book");

const bookPop = document.getElementById("add-book-popup");
const moviePop = document.getElementById("add-movie-popup");
const seriesPop = document.getElementById("add-series-popup");

const moviesBtn = document.getElementById("movies-btn");
const seriesBtn = document.getElementById("series-btn");
const booksBtn = document.getElementById("books-btn");

const movieCardTemp = document.getElementById("movie-card-template");

// ----------------
// Objects & Constructors:
// ----------------

function Entertainment() {
}

function Book(author, pages, title, genre, isFinished) {
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.author = author;
    this.pages = pages
    this.type = 'b';    
}

Book.prototype = Object.create(Entertainment.prototype);

function Series(seasons, title, genre, currentEp, isFinished){
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.seasons = seasons;
    this.currentEp = currentEp
    this.type = 's';
}

Series.prototype = Object.create(Entertainment.prototype);

function Movie(length, title, genre, currTime, isFinished){
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.length = length
    this.currentTime = currTime
    this.type = 'm';
}

Movie.prototype = Object.create(Entertainment.prototype);

// ----------------
// Event Listeners:
// ---------------- 

 moviesBtn.addEventListener("click", function() {
    mode = "movies"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
})

seriesBtn.addEventListener("click", function() {
    mode = "series"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
})

booksBtn.addEventListener("click", function() {
    mode = "books"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
})

plus.addEventListener("click", function(){
    switch (mode) {
        case "movies":
            moviePop.setAttribute("style", "display: block;")
            seriesPop.setAttribute("style", "display: none;")
            bookPop.setAttribute("style", "display: none;")
            break;
        case "series":
            seriesPop.setAttribute("style", "display: block;")
            moviePop.setAttribute("style", "display: none;")
            bookPop.setAttribute("style", "display: none;")
            break;
        case "books":
            bookPop.setAttribute("style", "display: block;")
            seriesPop.setAttribute("style", "display: none;")
            moviePop.setAttribute("style", "display: none;")
            break;
    }
});

submitMovie.addEventListener("click", function() {
    
    let isFinished = false
    let movieLength = document.getElementById("total-time").value
    let currTime = document.getElementById("finished-time").value
    let movieTitle = document.getElementById("movie-title").value
    let movieGenre = document.getElementById("movie-genre").value
    let newMovie = new Movie(movieLength, movieTitle, movieGenre, currTime, isFinished);
    
    if (currTime === movieLength){
        isFinished = true
    }

    if (movieLength.length != 0 && currTime.length != 0 && movieTitle.length != 0 && movieGenre.length != 0) {

        myMovies.push(newMovie);
        moviePop.setAttribute("style" ,"display: none;")

        let movieCardTemp = document.createElement('div');
        let tmpTitle = document.createElement('h3');
        let elem1 = document.createElement('h4');
        let elem2 = document.createElement('h4');
        let elem3 = document.createElement('h4');
        let elem4 = document.createElement('h4');
        
        movieCardTemp.classList.add("movie-card-template")
        tmpTitle.innerHTML = "Movie"
        elem1.innerHTML = `Title: ${movieTitle}`
        elem2.innerHTML = `Genre: ${movieGenre}`
        elem3.innerHTML = `Length: ${movieLength}`
        elem4.innerHTML = `Progress: ${currTime}`

        movieCardTemp.appendChild(tmpTitle)
        movieCardTemp.appendChild(elem1)
        movieCardTemp.appendChild(elem2)
        movieCardTemp.appendChild(elem3)
        movieCardTemp.appendChild(elem4)

        addCard.parentNode.insertBefore(movieCardTemp, addCard.nextSibling)
    } else {
        console.log("error") //to be changed
    }
});

submitSeries.addEventListener("click", function() {
    let isFinished = false
    if (document.getElementById("finished-seasons").value == document.getElementById("total-seasons").value){
        isFinished = true
    }

    let newSeries = new Series(document.getElementById("total-seasons").value, document.getElementById("series-title").value, document.getElementById("series-genre").value, document.getElementById("current-episode").value, isFinished);
    mySeries.push(newSeries);
    // seriesPop.setAttribute("style" ,"display: none;")
});

submitBook.addEventListener("click", function() {
    let isFinished = false
    if (document.getElementById("finished-pages").value == document.getElementById("total-pages").value){
        isFinished = true
    }

    let newBook = new Book(document.getElementById("author-name").value, document.getElementById("total-pages").value, document.getElementById("book-title").value, document.getElementById("book-genre").value, isFinished);
    myBooks.push(newBook);
    // bookPop.setAttribute("style", "display: none;")
});