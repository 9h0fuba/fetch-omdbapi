
function search(){
    $('#movie-list').html('');


    $.ajax({
        url: 'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data:{
            'apikey': '2111bd7b',
            's': $('#search-input').val()
        },
        success: function (result){
            if(result.Response == 'True' ){
                let movies = result.Search;
                $.each(movies, function(i,data){
                    $('#movie-list').append(`<div class="card m-3" style="width: 18rem;">
                    <img src="${data.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${data.Title}</h5>
                      <p class="card-text">${data.Year}.</p>
                      <a href="#" class="btn btn-primary see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdb="${data.imdbID}">See Detail</a>
                    </div>
                  </div>`);
                })

                
                $('#search-input').val('');
              


            } else {
                $('#movie-list').html(`
                <h1 class="text-center">${result.Error}</h1>
                `)
            }
        }

    });
}

$('#search-button').on('click', () => {
    search()
});

$('#search-input').on('keyup', event=>{
    if (event.keyCode == 13){
        search()
    }
});


$('#movie-list').on('click','.see-detail',function(){
   
    $.ajax({
        url:'http://www.omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey': '2111bd7b',
            'i': $(this).data('imdb')
        },
        success: function(movie){
            if(movie.Response == 'True'){
               $('.modal-body').html(`
              <div class="container-fluid">
                <div class="row">
                    <div class="col-md-5">
                <img src="${movie.Poster}" alt="">
                    </div>
                    <div class="col-md-7">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">${movie.Title}</li>
                        <li class="list-group-item">${movie.Year}</li>
                        <li class="list-group-item">Genre : ${movie.Genre}</li>
                        <li class="list-group-item">${movie.Plot}</li>
                     
                    </ul>
                    </div>

                </div>
                    
        </div>
               `)
            }
        }
    })

})