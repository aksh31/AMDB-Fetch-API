let cl = console.log; //=> first class function

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=2'; 
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const data = document.getElementById("data");
const searchBar = document.getElementById("form");
const search = document.getElementById("search");
let array = [];

fetch(API_URL)
    .then(response => response.json())
    .then(res => {
        cl(res.results)
        array = res.results;
        templating(array);
    });


function templating(arr){
    let result = '';
    arr.forEach(ele => {
        result += `<div class="col-md-3 col-sm-6">
                        <div class="card mb-4">
                            <div class="myImg">
                                <img src="${IMG_PATH+ele.poster_path}" alt="${ele.title}" class="img-fluid">
                            </div>
                            <div class="card-body">
                                <div class="headings">
                                    <h4 class="text-white">${ele.title}</h4>
                                    <span class="${ratingColor(ele.vote_average)}">${ele.vote_average}</span>
                                </div>
                            </div>    
                            <div class="bg-light p-5 overview">
                                <h5>Overview:</h5>
                                ${ele.overview}
                            </div>
                        </div>
                    </div>`
    });
    data.innerHTML = result;
}


function ratingColor(rate){
    if(rate >= 8){
        return "green";
    }else if(rate >=4){
        return "yellow";
    }else{
        return "red";
    }
}

const onSearchHandler = eve => {
    eve.preventDefault();

    if(search.value && search.value !== ""){
        fetch(`${SEARCH_API + search.value}`)
            .then(response => response.json())
            .then(res => {
                cl(res.results)
                templating(res.results);
            })
    searchBar.reset();
    }else{
        window.location.reload();
    }
}

searchBar.addEventListener("submit", onSearchHandler);