/**
 * Created by Lucas on 30/01/2017.
 */

document.addEventListener('contextmenu', event => event.preventDefault());

$(document).ready( function () {

    var nbBombes = 50;

    generateLayout(20,20);
    grid = new Grid(20,20);
    grid.addBombs(nbBombes);

    $('#nbbombes').text(nbBombes + ' bombes');

    document.oncontextmenu = function () {
        return false;
    };

    $('#reset').click(function(){
      nbBombes = 50;
      $('#nbbombes').text(nbBombes + ' bombes');
      for (var x=0;x<20;x++){
        for (var y=0;y<20;y++){
          $('td[data-x="'+ x +'"][data-y="'+ y +'"]').removeClass();
          $('td[data-x="'+ x +'"][data-y="'+ y +'"]').html("");
        }
      }
      grid = new Grid(20,20);
      grid.addBombs(50);

      $('td').each(function () {
          var x = parseInt($(this).attr("data-x"));
          var y = parseInt($(this).attr("data-y"));


          if (grid.cells[x][y] == "B"){
              $(this).addClass("bomb");
          } else if (grid.cells[x][y] == 0){
              $(this).addClass("empty");
          } else {
              $(this).addClass("number");
              $(this).html(grid.cells[x][y])
          }
      });
    });

    $('td').each(function () {

        var x = parseInt($(this).attr("data-x"));
        var y = parseInt($(this).attr("data-y"));


        if (grid.cells[x][y] == "B"){
            $(this).addClass("bomb");
        } else if (grid.cells[x][y] == 0){
            $(this).addClass("empty");
        } else {
            $(this).addClass("number");
            $(this).html(grid.cells[x][y])
        }


        $(this).mousedown(function (event) {

            var x = parseInt($(this).attr("data-x"));
            var y = parseInt($(this).attr("data-y"));

            if( event.button == 0 ){
                console.log('clic du bouton gauche');
                console.log(grid.cells[x][y]);

                if($(this).hasClass("flag")){
                  console.log('Erreur, il y a un drapeau');

                }  else {
                    if (grid.cells[x][y] == "B"){
                      $(this).addClass("bomb");
                    } else if (grid.cells[x][y] == 0){
                      $(this).addClass("empty");
                    } else {
                      $(this).addClass("number");
                      $(this).html(grid.cells[x][y])
                    }
                }

            } else if ( event.button == 2 ){
                console.log('clic du bouton droit');
                if (!$(this).hasClass("empty") && !$(this).hasClass("number")){
                    if($(this).hasClass("flag")){
                        $(this).removeClass('flag');
                        nbBombes += 1;
                    } else {
                        $(this).addClass('flag');
                        nbBombes -= 1;
                    }
                    $('#nbbombes').text(nbBombes + ' bombes');
                    console.log('Nombre de bombes : ' + nbBombes);
                }
            }
        });

        $(this).dblclick(function () {
            console.log("test");
        })
    });
});


function generateLayout(width, height){
    for (var y = 0; y < height; y++){
        var row = $("<tr></tr>");
        for (var x = 0; x < width; x++){
            row.append($('<td data-x="'+ x +'" data-y="'+ y +'"></td>'))
        }
        $('table tbody').append(row);
    }
}
