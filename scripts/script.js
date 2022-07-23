// ----------------
// Global variables & Constants:
// ----------------

document.bookForm.finishedPages.setAttribute("max", document.getElementById("total-pages").value);
document.seriesForm.finishedSeasons.setAttribute("max", document.getElementById("total-seasons").value);

let mode = "movies";
let myBooks = [];
let mySeries = [];
let myMovies = [];

let plus = document.getElementById("add-new");
let addCard = document.getElementById("add-card");

const submitMovie = document.getElementById("submit-movie");
const submitSeries = document.getElementById("submit-series");
const submitBook = document.getElementById("submit-book");

const bookPop = document.getElementById("add-book-popup");
const moviePop = document.getElementById("add-movie-popup");
const seriesPop = document.getElementById("add-series-popup");

const moviesBtn = document.getElementById("movies-btn");
const seriesBtn = document.getElementById("series-btn");
const booksBtn = document.getElementById("books-btn");

const cardsContainer = document.getElementById("card-container")

// ----------------
// Objects & Constructors:
// ----------------

function Entertainment() {
}

function Book(author, pages, currPage, title, genre, isFinished) {
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.author = author;
    this.pages = pages
    this.currPage = currPage
    this.type = 'b';    
}

Book.prototype = Object.create(Entertainment.prototype);

function Series(seasons, title, genre, currentEp, currentSeason,isFinished){
    this.title = title;
    this.genre = genre;
    this.isFinished = isFinished;
    this.seasons = seasons;
    this.currentSeason = currentSeason
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
    newAddCardfn()
    mode = "movies"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
    for (let i = 0; i < myMovies.length; i++) {
        const movie = myMovies[i];
        addMoviesfn(movie)
    }
})

seriesBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "series"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
    for (let i = 0; i < mySeries.length; i++) {
        const series = mySeries[i];
        addSeriesfn(series)
    }
})

booksBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "books"
    moviePop.setAttribute("style", "display: none;")
    seriesPop.setAttribute("style", "display: none;")
    bookPop.setAttribute("style", "display: none;")
    for (let i = 0; i < myBooks.length; i++) {
        const book = myBooks[i];
        addBooksfn(book)
    }
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
    let movieTitle = document.getElementById("movie-title").value
    let movieGenre = document.getElementById("movie-genre").value
    let movieLength = document.getElementById("total-time").value
    let currTime = document.getElementById("finished-time").value
    if (currTime === movieLength){
        isFinished = true
    }
    
    if (movieLength.length != 0 && currTime.length != 0 && movieTitle.length != 0 && movieGenre.length != 0) {
        let newMovie = new Movie(movieLength, movieTitle, movieGenre, currTime, isFinished);
        myMovies.push(newMovie);
        moviePop.setAttribute("style" ,"display: none;")
        addMoviesfn(newMovie)
    } else {
        console.log("error") //to be changed
    }
});

submitSeries.addEventListener("click", function() {

    let isFinished = false
    let seriesTitle = document.getElementById("series-title").value
    let seriesGenre = document.getElementById("series-genre").value
    let totalSeasons = document.getElementById("total-seasons").value
    let finishedSeasons = document.getElementById("finished-seasons").value
    let currEpisode = document.getElementById("current-episode").value
    if (finishedSeasons == totalSeasons){
        isFinished = true
    }
    
    if (seriesTitle.length != 0 && seriesGenre.length != 0 && totalSeasons.length != 0 && finishedSeasons.length != 0 && currEpisode.length != 0) {
        let newSeries = new Series(totalSeasons, seriesTitle, seriesGenre, currEpisode, finishedSeasons, isFinished);
        mySeries.push(newSeries);
        seriesPop.setAttribute("style" ,"display: none;");
        addSeriesfn(newSeries);
    }else{
        console.log("error") //to be changed
    }
});

submitBook.addEventListener("click", function() {
    
    let isFinished = false
    let bookTitle = document.getElementById("book-title").value
    let bookGenre = document.getElementById("book-genre").value
    let authorName = document.getElementById("author-name").value
    let totalPages = document.getElementById("total-pages").value
    let currPage = document.getElementById("finished-pages").value
    if (currPage == totalPages){
        isFinished = true
    }
    
    if (authorName.length != 0 && totalPages.length != 0 && bookTitle.length != 0 && bookGenre.length != 0 && currPage.length != 0) {
        let newBook = new Book(authorName, totalPages, currPage, bookTitle, bookGenre, isFinished);
        myBooks.push(newBook);
        bookPop.setAttribute("style", "display: none;");
        addBooksfn(newBook);
    }else{
        console.log("error") //to be changed
    }
});

// ----------------
// Functions:
// ---------------- 

function addMoviesfn(movie) {
    let movieCardTemp = document.createElement('div');
    let del = document.createElement('p');
    let tmpTitle = document.createElement('h3');
    let elem1 = document.createElement('h4');
    let elem2 = document.createElement('h4');
    let elem3 = document.createElement('h4');
    let elem4 = document.createElement('h4');

    let l = document.createElement('h4');
    l.innerHTML = "Finished?"
    let togglerLabel = document.createElement("label")
    let togglerInput =  document.createElement("input")
    let togglerSpan = document.createElement("span")
    togglerLabel.classList.add("switch")
    togglerInput.setAttribute("type", "checkbox")
    togglerSpan.classList.add("slider", "round")

    movieCardTemp.classList.add("card-template")
    del.setAttribute("onclick", "removeMovieCards(event)")
    del.innerHTML = "X"
    tmpTitle.innerHTML = "Movie"
    elem1.innerHTML = `Title: ${movie.title}`
    elem2.innerHTML = `Genre: ${movie.genre}`
    elem3.innerHTML = `Length: ${movie.length}`
    elem4.innerHTML = `Progress: ${movie.currentTime}`

    movieCardTemp.appendChild(del)
    movieCardTemp.appendChild(tmpTitle)
    movieCardTemp.appendChild(elem1)
    movieCardTemp.appendChild(elem2)
    movieCardTemp.appendChild(elem3)
    movieCardTemp.appendChild(elem4)

    movieCardTemp.appendChild(l)
    movieCardTemp.appendChild(togglerLabel)
    togglerLabel.appendChild(togglerInput)
    togglerLabel.appendChild(togglerSpan)

    togglerInput.addEventListener("change" , function() {
        if (togglerInput.checked){
            elem4.innerHTML = `Progress: ${movie.length}`
            movie.currentTime = movie.length
        }else{
            elem4.innerHTML = "Progress: ?"
            movie.currentTime = '?'
        }
    })

    addCard.parentNode.insertBefore(movieCardTemp, addCard.nextSibling)
}

function removeMovieCards(event) {
    cardsContainer.removeChild(event.target.parentNode)
    myMovies.splice(myMovies.indexOf(event.target), 1)
}

function addSeriesfn(series) {
    let seriesCardTemp = document.createElement('div');
    let del = document.createElement('p');
    let tmpTitle = document.createElement('h3');
    let elem1 = document.createElement('h4');
    let elem2 = document.createElement('h4');
    let elem3 = document.createElement('h4');
    let elem4 = document.createElement('h4');

    let l = document.createElement('h4');
    l.innerHTML = "Finished?"
    let togglerLabel = document.createElement("label")
    let togglerInput =  document.createElement("input")
    let togglerSpan = document.createElement("span")
    togglerLabel.classList.add("switch")
    togglerInput.setAttribute("type", "checkbox")
    togglerSpan.classList.add("slider", "round")

    seriesCardTemp.classList.add("card-template")
    del.setAttribute("onclick", "removeSeriesCards(event)")
    del.innerHTML = "X"
    tmpTitle.innerHTML = "Series"
    elem1.innerHTML = `Title: ${series.title}`
    elem2.innerHTML = `Genre: ${series.genre}`
    elem3.innerHTML = `Seasons: ${series.seasons}`
    elem4.innerHTML = `Progress: S${series.currentSeason}:E${series.currentEp}`

    seriesCardTemp.appendChild(del)
    seriesCardTemp.appendChild(tmpTitle)
    seriesCardTemp.appendChild(elem1)
    seriesCardTemp.appendChild(elem2)
    seriesCardTemp.appendChild(elem3)
    seriesCardTemp.appendChild(elem4)

    seriesCardTemp.appendChild(l)
    seriesCardTemp.appendChild(togglerLabel)
    togglerLabel.appendChild(togglerInput)
    togglerLabel.appendChild(togglerSpan)

    togglerInput.addEventListener("change" , function() {
        if (togglerInput.checked){
            elem4.innerHTML = `Progress: S${series.seasons}`
            series.currentSeason = series.seasons
            series.currentEp = "Finale"
        }else{
            elem4.innerHTML = "Progress: S?E?"
            series.currEpisode = '?'
        }
    })

    addCard.parentNode.insertBefore(seriesCardTemp, addCard.nextSibling)
}

function removeSeriesCards(event) {
    cardsContainer.removeChild(event.target.parentNode)
    mySeries.splice(mySeries.indexOf(event.target), 1)
}

function addBooksfn(book) {
    let bookCardTemp = document.createElement('div');
    let del = document.createElement('p');
    let tmpTitle = document.createElement('h3');
    let elem1 = document.createElement('h4');
    let elem2 = document.createElement('h4');
    let elem3 = document.createElement('h4');
    let elem4 = document.createElement('h4');
    let elem5 = document.createElement('h4');

    let l = document.createElement('h4');
    l.innerHTML = "Finished?"
    let togglerLabel = document.createElement("label")
    let togglerInput =  document.createElement("input")
    let togglerSpan = document.createElement("span")
    togglerLabel.classList.add("switch")
    togglerInput.setAttribute("type", "checkbox")
    togglerSpan.classList.add("slider", "round")

    bookCardTemp.classList.add("card-template")
    del.setAttribute("onclick", "removeBookCards(event)")
    del.innerHTML = "X"
    tmpTitle.innerHTML = "Book"
    elem1.innerHTML = `Title: ${book.title}`
    elem2.innerHTML = `Author: ${book.author}`
    elem3.innerHTML = `Genre: ${book.genre}`
    elem4.innerHTML = `Pages: ${book.pages}`
    elem5.innerHTML = `Progress: ${book.currPage}`

    bookCardTemp.appendChild(del)
    bookCardTemp.appendChild(tmpTitle)
    bookCardTemp.appendChild(elem1)
    bookCardTemp.appendChild(elem2)
    bookCardTemp.appendChild(elem3)
    bookCardTemp.appendChild(elem4)
    bookCardTemp.appendChild(elem5)

    bookCardTemp.appendChild(l)
    bookCardTemp.appendChild(togglerLabel)
    togglerLabel.appendChild(togglerInput)
    togglerLabel.appendChild(togglerSpan)

    togglerInput.addEventListener("change" , function() {
        if (togglerInput.checked){
            elem5.innerHTML = `Progress: ${book.pages}`
            book.currPage = book.pages
        }else{
            elem5.innerHTML = "Progress: ?"
            book.currPage = '?'
        }
    })

    addCard.parentNode.insertBefore(bookCardTemp, addCard.nextSibling)
}

function removeBookCards(event) {
    cardsContainer.removeChild(event.target.parentNode)
    myBooks.splice(myBooks.indexOf(event.target), 1)
}

function newAddCardfn() {
    cardsContainer.innerHTML = ""
    addCard = document.createElement('div')
    plus = document.createElement('p')
    plus.innerText = '+'
    addCard.id = "add-card"
    plus.id = "add-new"
    cardsContainer.appendChild(addCard)
    addCard.appendChild(plus)
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
}