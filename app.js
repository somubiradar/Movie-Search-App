//APIS:
        //for getting all popular movies
        const APIURL =
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
          //for imagepath of the movie shown on the screen
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
          //for all searched movies
    const SEARCHAPI =
        "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    
           //searched movies
    const moiveBox = document.querySelector("#movie-box")
           //to get all the popular movies
    const getMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        showMovies(data)
    }
    getMovies(APIURL);
    
           // TO SHOW ALL THE MOVIES
    const showMovies = (data) => {
        moiveBox.innerHTML = "";
        data.results.forEach(
            (result) => {
                const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;
                // const box = `
                // <div class="box">
                //     <img src="${IMGPATH+result}" alt="" />
                //     <div class="overlay">
                //         <h2>Overview:</h2>
                //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis iste doloribus quam voluptatum, illum unde nostrum dignissimos, mollitia, sapiente porro natus neque cupiditate distinctio quod possimus aliquid reiciendis vel. Soluta?
                //     </div>
                // </div>
                // `
                const box = document.createElement("div")
                box.classList.add("box")
                box.innerHTML = `
                    <img src="${imagePath}" alt="" />
                    <div class="overlay">
                        <div class="title"> 
                            <h2> ${result.original_title}  </h2>
                            <span> ${result.vote_average} <span>
                        </div>
                        <h3>Overview:</h3>
                        <p> 
                            ${result.overview}
                        </p>
                     </div>
                `
                moiveBox.appendChild(box)
            }
        )
    }
             //TO SHOW SELECTED MOVIES
    document.querySelector("#search").addEventListener(
        "keyup",
        function (event) {
            if (event.target.value != "") {
                //searched movies
                getMovies(SEARCHAPI + event.target.value)
            } else {
                //popular movies
                getMovies(APIURL);
            }
        }
    )