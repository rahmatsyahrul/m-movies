import "./style/style.css";
import $ from "jquery";
import moment from "moment";

const displayTime = () => {
    moment.locale("id");
    $(".time").text(moment().format("LTS"));

};

const updateTime = () => {
    displayTime();
    setTimeout(updateTime, 1000)
};

updateTime();

//api
$.ajax({
    url: 'http://www.omdbapi.com/?apikey=13988f9c&s=war',
    success: result => {
        const movies = result.Search;
        let cards = '';
        movies.forEach(mdb => {
            cards += `<div class="col-md-3 mt-5">
            <div class="card">
                <img src="${mdb.Poster}" class="card-img-top" style="height: 400px;">
                <div class="card-body">
                    <h5 class="card-title mb-5" style="height: 40px;">${mdb.Title} (${mdb.Year})</h5>
                    <a href="#" class="btn btn-dark detail-movie" data-toggle="modal" data-target="#detailMovi" data-imdbid="${mdb.imdbID}">More Details</a>
                </div>
            </div>
        </div>`;
            $('.mocon').html(cards);

            // menampilkan detail
            $('.detail-movie').on('click', function () {

                $.ajax({
                    url: 'http://www.omdbapi.com/?apikey=13988f9c&i=' + $(this).data('imdbid'),
                    success: mdb => {
                        const detailMovie = `<div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${mdb.Poster}" class="img-fluid">
                            </div>
                            <div class="col-md">
                                <ul class="list-group">
                                    <li class="list-group-item active bg-dark"><h4>${mdb.Title} (${mdb.Year})<h4></li>
                                    <li class="list-group-item"><strong>Genre : </strong> <br> ${mdb.Genre}</li>
                                    <li class="list-group-item"><strong>Actors : </strong> <br> ${mdb.Actors}</li>
                                    <li class="list-group-item"><strong>Language : </strong> <br> ${mdb.Language} </li>
                                    
                                </ul>
                            </div>

                        </div>
                    </div>`;
                        $('.modal-body').html(detailMovie);
                    }

                })
            })

        });
    }
})