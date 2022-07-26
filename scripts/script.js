// ----------------
// Global variables & Constants:
// ----------------

let mode = "movies";
let arrowFlag = false
let clicked = false
let myBooks = [];
let mySeries = [];
let myMovies = [];
let myBooksNodes = [];
let mySeriesNodes = [];
let myMoviesNodes = [];
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
const usrl = document.getElementById("usr-icon")
const quitBook = document.getElementById("quit-book")
const quitSeries = document.getElementById("quit-series")
const quitMovie = document.getElementById("quit-movie")
const movieForm = document.getElementById("movie-form")
const seriesForm = document.getElementById("series-form")
const bookForm = document.getElementById("book-form")
const finishedPagesMax = document.getElementById("finished-pages")
const finishedSeasonsMax = document.getElementById("finished-seasons")
const children = sideBar.childNodes;

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

document.querySelector('.theme-toggle').addEventListener('click', setTheme)

usrl.addEventListener('click', function() {
    const rick = document.getElementById('rick');
    rick.click()
})


arrowHide.addEventListener("click" , function() {
    clicked = !clicked
    arrowHide.classList.toggle("arrowEffect")
    if (arrowFlag){
        if (clicked) {
            sideBar.classList.remove("show")
            children[1].classList.remove("appear")
            children[3].classList.remove("appear")
            cardsContainer.classList.remove("go-right")
            sideBar.classList.add("hide")
            children[1].classList.add("disappear")
            children[3].classList.add("disappear")
            cardsContainer.classList.add("go-center")

        }else{
            sideBar.classList.remove("hide")
            children[1].classList.remove("disappear")
            children[3].classList.remove("disappear")
            cardsContainer.classList.remove("go-center")
            sideBar.classList.add("show")
            children[1].classList.add("appear")
            children[3].classList.add("appear")
            cardsContainer.classList.add("go-right")

        }
    }else{
        arrowFlag = true
        sideBar.classList.add("hide")
        children[1].classList.add("disappear")
        children[3].classList.add("disappear")
        cardsContainer.classList.add("go-center")
    }
});

moviesBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "movies"
    for (let i = 0; i < myMoviesNodes.length; i++) {
        const movie = myMoviesNodes[i];
        addCard.parentNode.insertBefore(movie, addCard.nextSibling);
    }
    moviesBtn.classList.add("active-btn");
    seriesBtn.classList.remove("active-btn");
    booksBtn.classList.remove("active-btn");

})

seriesBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "series"
    for (let i = 0; i < mySeries.length; i++) {
        const series = mySeriesNodes[i];
        addCard.parentNode.insertBefore(series, addCard.nextSibling);
    }
    moviesBtn.classList.remove("active-btn");
    seriesBtn.classList.add("active-btn");
    booksBtn.classList.remove("active-btn");
})

booksBtn.addEventListener("click", function() {
    newAddCardfn()
    mode = "books"
    for (let i = 0; i < myBooks.length; i++) {
        const book = myBooksNodes[i];
        addCard.parentNode.insertBefore(book, addCard.nextSibling);
    }
    moviesBtn.classList.remove("active-btn");
    seriesBtn.classList.remove("active-btn");
    booksBtn.classList.add("active-btn");
})

plus.addEventListener("click", function(){
    $('body').bind('touchmove', function(e){e.preventDefault()})
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

window.addEventListener("keydown", function(e){
    if (e.key === 'n') {
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
    }
});

window.addEventListener("keydown", function(e){
    if (e.key === 'q') {
        switch (mode) {
            case "movies":
                $(moviePop).fadeOut()
                break;
            case "series":
                $(seriesPop).fadeOut()
                break;
            case "books":
                $(bookPop).fadeOut()
                break;
        }
    }
});

quitMovie.addEventListener("click", function() {
    $('body').unbind('touchmove')
    $(moviePop).fadeOut()
})

quitBook.addEventListener("click", function() {
    $('body').unbind('touchmove')
    $(bookPop).fadeOut()
})

quitSeries.addEventListener("click", function() {
    $('body').unbind('touchmove')
    $(seriesPop).fadeOut()
})

// ----------------
// Functions:
// ---------------- 

function addMoviesfn(movie) {
    const node = document.getElementsByClassName("movie-sample")[0];
    let movieCardTemp = node.cloneNode(true);
    movieCardTemp.setAttribute("style", "display: flex;");
    movieCardTemp.id = `movie-${myMovies.length - 1}`
    let del = movieCardTemp.querySelector('.img');
    let finished = movieCardTemp.querySelector('button');
    let elem1 = movieCardTemp.querySelector('.mc-title');
    let elem2 = movieCardTemp.querySelector('.mc-genre');
    let elem3 = movieCardTemp.querySelector('.mc-progress');
    let elem4 = movieCardTemp.querySelector('.mc-length');
    del.setAttribute("onclick", "removeMovieCards(event)");
    finished.setAttribute("onclick", "finishedMovie(event)")

    elem1.innerHTML = movie.title;
    elem2.innerHTML = movie.genre;
    elem3.innerHTML = movie.currentTime;
    elem4.innerHTML = movie.length;

    finished.removeAttribute("disabled");
    if (movie.isFinished) {
        finished.setAttribute("disabled", '');
    }

    addCard.parentNode.insertBefore(movieCardTemp, addCard.nextSibling);
    myMoviesNodes.push(movieCardTemp);
}

function finishedMovie(event) {
    let movieCardTemp = event.target.parentNode.parentNode
    let index = event.target.parentNode.parentNode.id.split('-')[1]
    let elem = movieCardTemp.querySelector('.mc-progress');
    
    myMovies[index].currentTime = myMovies[index].length
    myMovies[index].isFinished = true
    event.target.setAttribute("disabled", '');
    elem.innerHTML = myMovies[index].length
}

function removeMovieCards(event) {
    let movieCardTemp = event.target.parentNode.parentNode.parentNode
    let index = event.target.parentNode.parentNode.parentNode.id.split('-')[1]

    myMoviesNodes.splice(index, 1)
    myMovies.splice(index, 1)
    cardsContainer.removeChild(movieCardTemp)

    let i = 0
    myMoviesNodes.forEach(node => {
        node.id = `movie-${i}`
        i++;
    });
}

function addSeriesfn(series) {
    const node = document.getElementsByClassName("series-sample")[0];
    let seriesCardTemp = node.cloneNode(true);
    seriesCardTemp.setAttribute("style", "display: flex;");
    seriesCardTemp.id = `series-${mySeries.length - 1}`
    let del = seriesCardTemp.querySelector('.img');
    let finished = seriesCardTemp.querySelector('button');
    let elem1 = seriesCardTemp.querySelector('.sc-title');
    let elem2 = seriesCardTemp.querySelector('.sc-genre');
    let elem3 = seriesCardTemp.querySelector('.sc-seasons');
    let elem4 = seriesCardTemp.querySelector('.sc-current');
    del.setAttribute("onclick", "removeSeriesCards(event)");
    finished.setAttribute("onclick", "finishedSeries(event)")
    elem1.innerHTML = series.title;
    elem2.innerHTML = series.genre;
    elem3.innerHTML = `S${series.seasons}`;
    elem4.innerHTML = `S${series.currentSeason}:E${series.currentEp}`

    finished.removeAttribute("disabled");
    if (series.isFinished) {
        finished.setAttribute("disabled", '');
    }

    addCard.parentNode.insertBefore(seriesCardTemp, addCard.nextSibling);
    mySeriesNodes.push(seriesCardTemp);
}

function finishedSeries(event) {
    let seriesCardTemp = event.target.parentNode.parentNode
    let index = event.target.parentNode.parentNode.id.split('-')[1]
    let elem = seriesCardTemp.querySelector('.sc-current');
    
    mySeries[index].currentSeason = mySeries[index].seasons
    mySeries[index].isFinished = true
    event.target.setAttribute("disabled", '');
    elem.innerHTML = `S${mySeries[index].seasons}`
}

function removeSeriesCards(event) {
    let seriesCardTemp = event.target.parentNode.parentNode.parentNode
    let index = event.target.parentNode.parentNode.parentNode.id.split('-')[1]

    mySeriesNodes.splice(index, 1)
    mySeries.splice(index, 1)
    cardsContainer.removeChild(seriesCardTemp)

    let i = 0
    mySeriesNodes.forEach(node => {
        node.id = `series-${i}`
        i++;
    });
}

function addBooksfn(book) {
    const node = document.getElementsByClassName("book-sample")[0];
    let bookCardTemp = node.cloneNode(true);
    bookCardTemp.setAttribute("style", "display: flex;");
    bookCardTemp.id = `book-${myBooks.length - 1}`
    let del = bookCardTemp.querySelector('.img');
    let finished = bookCardTemp.querySelector('button');
    let elem1 = bookCardTemp.querySelector('.bc-title');
    let elem2 = bookCardTemp.querySelector('.bc-genre');
    let elem3 = bookCardTemp.querySelector('.bc-author');
    let elem4 = bookCardTemp.querySelector('.bc-pages');
    let elem5 = bookCardTemp.querySelector('.bc-current');

    finished.removeAttribute("disabled");
    if (book.isFinished) {
        finished.setAttribute("disabled", '');
    }

    del.setAttribute("onclick", "removeBookCards(event)");
    finished.setAttribute("onclick", "finishedBook(event)")
    elem1.innerHTML = book.title;
    elem2.innerHTML = book.genre;
    elem3.innerHTML = `by ${book.author}`;
    elem4.innerHTML = book.pages;
    elem5.innerHTML = book.currPage;

    addCard.parentNode.insertBefore(bookCardTemp, addCard.nextSibling);
    myBooksNodes.push(bookCardTemp);
}

function finishedBook(event) {
    let bookCardTemp = event.target.parentNode.parentNode
    let index = event.target.parentNode.parentNode.id.split('-')[1]
    let elem = bookCardTemp.querySelector('.bc-current');
    
    myBooks[index].currPage = myBooks[index].pages
    myBooks[index].isFinished = true
    event.target.setAttribute("disabled", '');
    elem.innerHTML = myBooks[index].pages
}

function removeBookCards(event) {
    let bookCardTemp = event.target.parentNode.parentNode.parentNode
    let index = event.target.parentNode.parentNode.parentNode.id.split('-')[1]

    myBooksNodes.splice(index, 1)
    myBooks.splice(index, 1)
    cardsContainer.removeChild(bookCardTemp)

    let i = 0
    myBooksNodes.forEach(node => {
        node.id = `series-${i}`
        i++;
    });
}

function newAddCardfn() {
    cardsContainer.innerHTML = ""
    addCard = document.createElement('div')
    plus = document.createElement('div')
    plus.classList.add("img")
    addCard.id = "add-card"
    plus.id = "add-new"
    cardsContainer.appendChild(addCard)
    addCard.appendChild(plus)
    plus.addEventListener("click", function(){
        $('body').bind('touchmove', function(e){e.preventDefault()})
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
        $('body').unbind('touchmove')
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
        $('body').unbind('touchmove')
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
        $('body').unbind('touchmove')
    }
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = root.className === 'dark' ? 'light' : 'dark';
    root.className = newTheme;
}

// ----------------
// Copyright year
// ---------------- 

let currentYear = new Date().getFullYear(); 
let startYr = document.getElementById("starting-year").textContent;

if (startYr != currentYear){
    document.getElementById("current-year").textContent = `-${currentYear}`;
}
