
//A PARTE DOS FILMES FICOU POR TERMINAR
$(document).ready(function (){
    let lista = $("#moviesList");
    let pesquisa = $('#searchField');
    
    $('form').submit(function (e){
        e.preventDefault();
        $('#searchBtn').click();
    });
    
    $('#searchBtn').click(function() {
        let search = pesquisa.val();
            
        if(search != ""){
            $.ajax({
                url: "https://api.themoviedb.org/3/search/movie",
                type: "GET",
                dataType: "JSON",
                data: {
                    api_key: "be1c7d906e6044e5a018be83a577eafb",
                    language: "en-US",
                    query: search,
                    page: 1
                },
                success: function(request){
                Successed(request);
                },
                error: function(error){
                    Error(error);
                }
            });
        }
        else{
            lista.empty();
            let legenda = $("<label>").text("Sem resultados para a pesquisa!");
            $("<li style='display: block !important;'>").append(legenda).appendTo(lista);
        }
    });
    
    $('#popular').click(function() {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/popular",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "be1c7d906e6044e5a018be83a577eafb",
                language: "en-US"
            },
            success: function(request){
                Successed(request);
            },
            error: function(error){
                Error(error);
            }
        });
    });
    
    $('#top_rated').click(function() {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/top_rated",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "be1c7d906e6044e5a018be83a577eafb",
                language: "en-US"
            },
            success: function(request){
                Successed(request);
            },
            error: function(error){
                Error(error);
            }
        });
    });
    
    $('#upcoming').click(function() {
        $.ajax({
            url: "https://api.themoviedb.org/3/movie/upcoming",
            type: "GET",
            dataType: "JSON",
            data: {
                api_key: "be1c7d906e6044e5a018be83a577eafb",
                language: "en-US"
            },
            success: function(request){
                Successed(request);
            },
            error: function(error){
                Error(error);
            }
        });
    });
    
    function Successed(request){
        lista.empty();
        let movies = request["results"];
        if(movies.length != 0){
            for(let i=0; i<movies.length; i++){
                if(movies[i].title != null){
                    if(movies[i].poster_path != null){
                        movieImg(movies[i].id, "https://image.tmdb.org/t/p/w185"+movies[i].poster_path, movies[i].title);
                    }
                    else{
                        movieImg(movies[i].id, "Image/filme.jpg", movies[i].title);
                    }
                }
            }
        }
        else{
            let legenda = $("<label>").text("Sem resultados para a pesquisa!");
            $("<li style='display: block !important;'>").append(legenda).appendTo(lista);
        }
    }
    
    function Error(error){
        let legenda = $("<label>").text("Erro " + error.status + ": " + error.responseJSON.status_message);
        $("<li style='display: block !important;'>").append(legenda).appendTo(lista);
    }
    
    function movieImg (id, url, title){
        let link = $("<a>").attr("href", "#" + id);
        let thumbnail = $("<img>").attr("src", url);
        let legenda = $("<label>").text(title);
        $("<li>").append(link.append(thumbnail).append("<br>").append("<br>").append(legenda)).appendTo(lista);
    }
});

