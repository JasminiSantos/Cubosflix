const divFilmes = document.querySelector(".movies");
const minPages = 0;
const maxPages = 15;
let allMovies = [];
const urlAllMovies = 'https://tmdb-proxy.cubos-academy.workers.dev/3/discover/movie?language=pt-BR&include_adult=false';
const urlFilteredMovies = 'https://tmdb-proxy.cubos-academy.workers.dev/3/search/movie?language=pt-BR&include_adult=false&query=';

const themeButton = document.querySelector('.btn-theme');
const body = document.querySelector('body');
body.style.setProperty('--backgroundColor', '#fff');

themeButton.addEventListener('click',function(){
    const highlightInfo = document.querySelector('.highlight__info');
    const highlightGenres = document.querySelector('.highlight__genres');
    const highlightlaunch = document.querySelector('.highlight__launch');
    const input = document.querySelector('.input');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');


    const newBackgroundColor = body.style.getPropertyValue('--backgroundColor') === '#242424' ? '#ffffff' : '#242424';
    body.style.setProperty('--backgroundColor', newBackgroundColor);

    if(newBackgroundColor === '#242424'){
        themeButton.setAttribute('src', "./assets/dark-mode.svg");
        highlightInfo.style.setProperty('background-color', '#454545');
        input.style.setProperty('background-color', '#242424');
        input.style.setProperty('color', '#FFFFFF');
        highlightGenres.style.setProperty('color', "#FFFFFF");
        highlightlaunch.style.setProperty('color', "#FFFFFF");
        body.style.setProperty('color', '#FFFFFF');
        btnPrev.setAttribute('src','./assets/seta-esquerda-branca.svg');
        btnNext.setAttribute('src', './assets/seta-direita-branca.svg')
    }
    else{
        themeButton.setAttribute('src', "./assets/light-mode.svg");
        highlightInfo.style.setProperty('background-color', '#FFFFFF');
        input.style.setProperty('background-color', '#FFFFFF');
        input.style.setProperty('color', '#979797');
        highlightGenres.style.setProperty('color', "#000000");
        highlightlaunch.style.setProperty('color', "#000000");
        body.style.setProperty('color', '#000000');
        btnPrev.setAttribute('src','./assets/seta-esquerda-preta.svg');
        btnNext.setAttribute('src', './assets/seta-direita-preta.svg')
    }
});

function loadAllMovies(){
    fetch(urlAllMovies).then(function(resposta){
        return resposta.json();
    }).then(function({results}){
        allMovies = results;
        refreshMovies();
    });    
}
function refreshMovies(){
    divFilmes.innerHTML = "";
    for(let i = 0; i < 5; i++){
        const divFilme = document.createElement('div');
        divFilme.classList.add('movie');
        divFilme.style.backgroundImage = (`url(${allMovies[i].poster_path})`);

        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie__info');

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie__title');
        movieTitle.textContent = `${allMovies[i].title}`

        const movieRating = document.createElement('span');
        movieRating.classList.add('movie__rating');
        movieRating.textContent = `${allMovies[i].vote_average}`

        const estrela = document.createElement('img');
        estrela.src = "./assets/estrela.svg";

        movieRating.append(estrela);
        movieInfo.append(movieTitle, movieRating);

        divFilme.append(movieInfo);

        divFilmes.append(divFilme);
    }
    document.querySelectorAll('.movie').forEach(movie => {
        movie.addEventListener('click',function(event){
            const title = event.target.querySelector('.movie__title').textContent;
            const findMovie = allMovies.find(movie => movie.title === title);
            fetch(`https://tmdb-proxy.cubos-academy.workers.dev/3/movie/${findMovie.id}?language=pt-BR`).then(function(response){
                return response.json();
            }).then(function(body){
                const modal = document.querySelector('.modal');
                const modalImage = document.querySelector('.modal__img');
                const modalTitle = document.querySelector('.modal__title');
                const modalDescription = document.querySelector('.modal__description');
                const modalGenres = document.querySelector('.modal__genres');
                const modalRating = document.querySelector('.modal__average');
                const modalClose = document.querySelector('.modal__close');

                modalImage.src = body.backdrop_path;
                modalTitle.textContent = body.title;
                modalDescription.textContent = body.overview;
                modalRating.textContent = body.vote_average;                
                modalGenres.innerHTML = "";
                const file = document.querySelector('html');
                file.classList.add('no__scroll'); 

                body.genres.forEach(genre =>{
                    const genres = document.createElement('span');
                    genres.classList.add('modal__genre');
                    genres.textContent = genre.name;
                    modalGenres.append(genres);
                });
                modalClose.addEventListener('click', ()=>{
                    modal.classList.add('hidden');
                    file.classList.remove('no__scroll');
                    return;
                });
                modal.addEventListener('click', ()=>{
                    modal.classList.add('hidden');
                    file.classList.remove('no__scroll');
                    return;
                });

                modal.classList.remove('hidden');
            });
        });
    });
}
        document.querySelector('.btn-prev').addEventListener('click', function(){
            const movies = document.querySelectorAll('.movie');
            const firstMovieTitle = movies[0].querySelector('.movie__title').textContent;

            const index = allMovies.findIndex(movie => movie.title === firstMovieTitle);
            
            if(index === 0){
                let i = 5;
                movies.forEach((movie, index) => {
                    const title = movie.querySelector('.movie__title');
                    const rating = movie.querySelector('.movie__rating');
    
                    movie.style.backgroundImage = (`url(${allMovies[allMovies.length-i].poster_path})`);
                    title.textContent = allMovies[allMovies.length-i].title;
                    rating.textContent = allMovies[allMovies.length-i].vote_average;
                    i--;
                });
            }
            else{
                let i = 5;
                movies.forEach(movie => {
                    const title = movie.querySelector('.movie__title');
                    const rating = movie.querySelector('.movie__rating');
    
                    movie.style.backgroundImage = (`url(${allMovies[index-i].poster_path})`);
                    title.textContent = allMovies[index-i].title;
                    rating.textContent = allMovies[index-i].vote_average;
                    i--;
                });
            }
        });
        document.querySelector('.btn-next').addEventListener('click', function(botao){
            const movies = document.querySelectorAll('.movie');
            const lastMovieTitle = movies[4].querySelector('.movie__title').textContent;

            const index = allMovies.findIndex(movie => movie.title === lastMovieTitle);
            
            if(index === allMovies.length - 1){
                movies.forEach((movie, index) => {
                    const title = movie.querySelector('.movie__title');
                    const rating = movie.querySelector('.movie__rating');
    
                    movie.style.backgroundImage = (`url(${allMovies[index].poster_path})`);
                    title.textContent = allMovies[index].title;
                    rating.textContent = allMovies[index].vote_average;
                });             
            }
            else{
                let i = 1;
                movies.forEach(movie => {
                    const title = movie.querySelector('.movie__title');
                    const rating = movie.querySelector('.movie__rating');
    
                    movie.style.backgroundImage = (`url(${allMovies[index+i].poster_path})`);
                    title.textContent = allMovies[index+i].title;
                    rating.textContent = allMovies[index+i].vote_average;
                    i++;
                });
            }
        });
loadAllMovies();

function getFilteredMovies(input){
    fetch(urlFilteredMovies+input).then(function(response){
        return response.json();
        
    }).then(function({results}){
        allMovies = results;
        refreshMovies();
    });
};
document.querySelector('.input').addEventListener('keypress',function(event){
    if(event.key !== 'Enter') return;
    refreshMovies();
    if(!event.target.value){
        loadAllMovies();
        event.target.value = "";
        return;
    } 
    getFilteredMovies(event.target.value);
    event.target.value = "";
});

fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969?language=pt-BR').then(function(resposta){
    const promisebody = resposta.json();    

    promisebody.then(function(body){
        const highlightVideo = document.querySelector('.highlight__video');
        highlightVideo.style.backgroundImage = (`url(${body.backdrop_path})`);

        const highlightTitle = document.querySelector('.highlight__title');
        highlightTitle.textContent = body.title;

        const highlightRating = document.querySelector('.highlight__rating');
        highlightRating.textContent = body.vote_average;

        let genres = [];
        body.genres.forEach(genre =>{
            genres.push(genre.name);
        })
        const highlightGenres = document.querySelector('.highlight__genres');
        highlightGenres.textContent = genres.join(', ');

        const highlightlaunch = document.querySelector('.highlight__launch');
        highlightlaunch.textContent = body.release_date;

        const highlightDescription = document.querySelector('.highlight__description');
        highlightDescription.textContent = body.overview;

    });
});
fetch('https://tmdb-proxy.cubos-academy.workers.dev/3/movie/436969/videos?language=pt-BR').then(function(resposta){
    const promisebody = resposta.json();    

    promisebody.then(function(body){
        const videoLink = document.querySelector('.highlight__video-link');

        videoLink.href = "https://www.youtube.com/watch?v="+ body.results[0].key;

    });
});