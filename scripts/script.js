// ----------------
// Global variables & Constants:
// ----------------

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

const sideBar = document.getElementById("side-bar");
const arrowHide = document.getElementById("side-bar-hide");
const children = sideBar.childNodes;

const quitBook = document.getElementById("quit-book")
const quitSeries = document.getElementById("quit-series")
const quitMovie = document.getElementById("quit-movie")

const movieForm = document.getElementById("movie-form")
const seriesForm = document.getElementById("series-form")
const bookForm = document.getElementById("book-form")

const finishedPagesMax = document.getElementById("finished-pages")
const finishedSeasonsMax = document.getElementById("finished-seasons")

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

arrowHide.addEventListener("click" , function() {
    sideBar.classList.toggle("hide")
    sideBar.classList.toggle("show")
    arrowHide.classList.toggle("arrowEffect")
    children[1].classList.toggle("disappear")
    children[3].classList.toggle("disappear")
    children[1].classList.toggle("appear")
    children[3].classList.toggle("appear")

});

moviesBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "movies"
    for (let i = 0; i < myMovies.length; i++) {
        const movie = myMovies[i];
        addMoviesfn(movie)
    }
    moviesBtn.classList.add("active-btn");
    seriesBtn.classList.remove("active-btn");
    booksBtn.classList.remove("active-btn");

})

seriesBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "series"
    for (let i = 0; i < mySeries.length; i++) {
        const series = mySeries[i];
        addSeriesfn(series)
    }
    moviesBtn.classList.remove("active-btn");
    seriesBtn.classList.add("active-btn");
    booksBtn.classList.remove("active-btn");
})

booksBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "books"
    for (let i = 0; i < myBooks.length; i++) {
        const book = myBooks[i];
        addBooksfn(book)
    }
    moviesBtn.classList.remove("active-btn");
    seriesBtn.classList.remove("active-btn");
    booksBtn.classList.add("active-btn");
})

plus.addEventListener("click", function(){
    switch (mode) {
        case "movies":
            $(moviePop).hide().fadeIn()
            break;
        case "series":
            $(seriesPop).hide().fadeIn()
            break;
        case "books":
            $(bookPop).hide().fadeIn()
            break;
    }
});

quitMovie.addEventListener("click", function() {
    $(moviePop).fadeOut()
})

quitBook.addEventListener("click", function() {
    $(bookPop).fadeOut()
})

quitSeries.addEventListener("click", function() {
    $(seriesPop).fadeOut()
})

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
    plus = document.createElement('img')
    plus.setAttribute("src", "images/light/plus.png")
    addCard.id = "add-card"
    plus.id = "add-new"
    cardsContainer.appendChild(addCard)
    addCard.appendChild(plus)
    plus.addEventListener("click", function(){
        switch (mode) {
            case "movies":
                $(moviePop).hide().fadeIn()
                break;
            case "series":
                $(seriesPop).hide().fadeIn()
                break;
            case "books":
                $(bookPop).hide().fadeIn()
                break;
        }
    });
}

function submitMovieBtn() {
    let isFinished = false
    let movieTitle = document.getElementById("movie-title")
    let movieGenre = document.getElementById("movie-genre")
    let movieLength = document.getElementById("total-time")
    let currTime = document.getElementById("finished-time")

    if (currTime.value === movieLength.value){
        isFinished = true
    }
    
    if (movieTitle.reportValidity() && movieGenre.reportValidity() && movieLength.reportValidity() && currTime.reportValidity()) {
        let newMovie = new Movie(movieLength.value, movieTitle.value, movieGenre.value, currTime.value, isFinished);
        myMovies.push(newMovie);
        $(moviePop).fadeOut()
        addMoviesfn(newMovie)
        movieTitle.value = ''
        movieGenre.value = ''
        movieLength.value = ''
        currTime.value = ''
    }
}

function submitSeriesBtn() {
    let isFinished = false
    let seriesTitle = document.getElementById("series-title")
    let seriesGenre = document.getElementById("series-genre")
    let totalSeasons = document.getElementById("total-seasons")
    let finishedSeasons = document.getElementById("finished-seasons")
    let currEpisode = document.getElementById("current-episode")

    if (finishedSeasons == totalSeasons){
        isFinished = true
    }
    
    finishedSeasons.setAttribute("max", totalSeasons.value)

    if (seriesTitle.reportValidity() && seriesGenre.reportValidity() && totalSeasons.reportValidity() && finishedSeasons.reportValidity() 
    && currEpisode.reportValidity()) {
        let newSeries = new Series(totalSeasons.value, seriesTitle.value, seriesGenre.value, currEpisode.value, finishedSeasons.value, isFinished);
        mySeries.push(newSeries);
        $(seriesPop).fadeOut()
        addSeriesfn(newSeries);
        seriesTitle.value = ''
        seriesGenre.value = ''
        totalSeasons.value = ''
        finishedSeasons.value = ''
        currEpisode.value = ''
    }
}

function submitBookBtn() {
    let isFinished = false
    let bookTitle = document.getElementById("book-title")
    let bookGenre = document.getElementById("book-genre")
    let authorName = document.getElementById("author-name")
    let totalPages = document.getElementById("total-pages")
    let currPage = document.getElementById("finished-pages")
    
    if (currPage.value == totalPages.value){
        isFinished = true
    }

    currPage.setAttribute("max", totalPages.value)
    
    if (bookTitle.reportValidity() && bookGenre.reportValidity() && authorName.reportValidity() && totalPages.reportValidity() && currPage.reportValidity()) {
        let newBook = new Book(authorName.value, totalPages.value, currPage.value, bookTitle.value, bookGenre.value, isFinished);
        myBooks.push(newBook);
        $(bookPop).fadeOut()
        addBooksfn(newBook);
        bookTitle.value = ''
        bookGenre.value = ''
        authorName.value = ''
        totalPages.value = ''
        currPage.value = ''
    }
}