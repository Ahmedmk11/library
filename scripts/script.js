// function setTheme() {
//     const root = document.documentElement;
//     const newTheme = root.className === 'dark' ? 'light' : 'dark';
//     root.className = newTheme;
// }
// document.querySelector('.theme-toggle').addEventListener('click', setTheme)

// let currentYear = new Date().getFullYear(); 
// let startYr = document.getElementById("starting-year").textContent;
// if(startYr != currentYear){
//     document.getElementById("current-year").textContent = `-${currentYear}`;
// }

let mode = "movies"

document.bookForm.finishedPages.setAttribute("max", document.getElementById("total-pages").value);
document.seriesForm.finishedSeasons.setAttribute("max", document.getElementById("total-seasons").value);

const submitNew = document.getElementById("submit");
const plus = document.getElementById("add-new");

const bookPop = document.getElementById("add-book-popup");
const moviePop = document.getElementById("add-movie-popup");
const seriesPop = document.getElementById("add-series-popup");

const moviesBtn = document.getElementById("movies-btn")
const seriesBtn = document.getElementById("series-btn")
const booksBtn = document.getElementById("books-btn")

moviesBtn.addEventListener("click", function() {
    mode = "movies"
})

seriesBtn.addEventListener("click", function() {
    mode = "series"
})

booksBtn.addEventListener("click", function() {
    mode = "books"
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

submitNew.addEventListener("click", function() {
    switch (mode) {
        case "movies":
            addMovieToLibrary
            break;
        case "series":
            addSeriesToLibrary
            break;
        case "books":
            addBookToLibrary
            break;
    }
});

let myBooks = [];
let mySeries = [];
let myMovies = [];

function Entertainment() {
}

Entertainment.prototype.getInfo = function () {
    switch (this.type){
        case 'b':
            return `${this.title} by ${this.author}, ${this.genre}, ${this.pages}, ${(this.isFinished)? "read" : "not read yet"}`;
        case 's':
            return `${this.title}, ${this.genre}, S${this.seasons}, ${this.currentEp}, ${(this.isFinished)? "finished" : "not finished yet"}`;
        case 'm':
            if (this.minutes < 10){
                return `${this.title}, ${this.genre}, ${this.hours}:0${this.minutes}, ${(this.isFinished)? "finished" : "not finished yet"}`;
            }else{
                return `${this.title}, ${this.genre}, ${this.hours}:${this.minutes}, ${(this.isFinished)? "finished" : "not finished yet"}`;
            }
    }
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

function Movie(hours, minutes, title, genre, isFinished){
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.hours = hours;
    this.minutes = minutes;
    this.type = 'm';
}

Movie.prototype = Object.create(Entertainment.prototype);

function addBookToLibrary() {
    let isFinished = false
    if (document.getElementById("finished-pages").value == document.getElementById("total-pages").value){
        isFinished = true
    }

    let newBook = new Book(document.getElementById("author-name").value, document.getElementById("total-pages").value, document.getElementById("book-title").value, document.getElementById("book-genre").value, isFinished);
    myBooks.push(newBook);
    bookPop.setAttribute("style", "display: none;")
}

function addSeriesToLibrary() {
    let isFinished = false
    if (document.getElementById("finished-seasons").value == document.getElementById("total-seasons").value){
        isFinished = true
    }

    let newSeries = new Series(document.getElementById("total-seasons").value, document.getElementById("series-title").value, document.getElementById("series-genre").value, document.getElementById("current-episode").value, isFinished);
    mySeries.push(newSeries);
    seriesPop.setAttribute("style" ,"display: none;")
}

function addMovieToLibrary() {
    let isFinished = false
    if (document.getElementById("finished-time").value === document.getElementById("total-time").value){
        isFinished = true
    }

    hrs = document.getElementById("total-hours").value.split(':')[0]
    mins = document.getElementById("total-hours").value.split(':')[1]

    let newMovie = new Series(hrs, mins, document.getElementById("movie-title").value, document.getElementById("movie-genre").value, isFinished);
    myMovies.push(newMovie);
    moviePop.setAttribute("style" ,"display: none;")
}
