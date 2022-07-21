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
            return `${this.title}, ${this.genre}, S${this.seasons}, ${(this.isFinished)? "finished" : "not finished yet"}`;
        case 'm':
            if (this.minutes < 10){
                return `${this.title}, ${this.genre}, ${this.hours}:0${this.minutes}, ${(this.isFinished)? "finished" : "not finished yet"}`;
            }else{
                return `${this.title}, ${this.genre}, ${this.hours}:${this.minutes}, ${(this.isFinished)? "finished" : "not finished yet"}`;
            }
        default:
            break;
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

function Series(seasons, title, genre, isFinished){
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.seasons = seasons;
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

function addBookToLibrary(author, pages, title, genre, isFinished) {
    let newBook = new Book(author, pages, title, genre, isFinished);
    myBooks.push(newBook);
}

function addSeriesToLibrary(seasons, title, genre, isFinished) {
    let newSeries = new Series(seasons, title, genre, isFinished);
    mySeries.push(newSeries);
}

function addMovieToLibrary(hours, minutes, pages, title, genre, isFinished) {
    let newMovie = new Movie(hours, minutes, pages, title, genre, isFinished);
    myMovies.push(newMovie);
}

addBookToLibrary("J.R.R Tolkien", 295, "The Hobbit", "Fantasy", false)
addSeriesToLibrary(6, "JoJo's Bizarre Adventures", "Supernatural Fiction", true)
addMovieToLibrary(1,30, "Shrek", "Adventure Comedy", true)
