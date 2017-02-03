/**
 * Created by Lucas on 30/01/2017.
 */

document.addEventListener('contextmenu', function (event) {
    event.preventDefault()
});

$(document).ready(function () {
    stopGame = false;
    firstLeftClick = true;
    firstClick = true;
    timer = new Timer();
    updateTimer();

    $('select#niveau').change(function(){   // Selection du niveau
      console.log($('select#niveau').val());
      switch ($('select#niveau').val()) {
        case "Facile":
          $('#menu input').prop('disabled', true);
          $('#largeur').val(10);
          $('#hauteur').val(10);
          $('#bombs').val(10);
          break;
        case "Moyen":
          $('#menu input').prop('disabled', true);
          $('#largeur').val(20);
          $('#hauteur').val(15);
          $('#bombs').val(45);
          break;
        case "Difficile":
          $('#menu input').prop('disabled', true);
          $('#largeur').val(35);
          $('#hauteur').val(20);
          $('#bombs').val(170);
          break;
        case "Personnalisé":
          $('#menu input').prop('disabled', false);
          break;
      }
    });

    $('button#validate').click(function () {
        if ($('#largeur').val() != "" && $('#hauteur').val() != "" && $('#bombs').val() != "") {
            largeur = parseInt($('#largeur').val());
            hauteur = parseInt($('#hauteur').val());
            bombs = parseInt($('#bombs').val());

            if (!isNaN(largeur) && !isNaN(hauteur) && !isNaN(bombs)) {
                if (testParameters(largeur, hauteur, bombs)) {
                    initGameboard();
                }
            }
        }
    });

});


function testParameters(largeur, hauteur, bombs) {
    if (((largeur * hauteur) / 3) * 2 >= bombs) {
        if (largeur <= 50 && hauteur <= 40) {
            return true;
        }
    }
    return false;
}


function initGameboard() {
    stopGame = false;
    firstLeftClick = true;
    firstClick = true;
    timer.reset();
    generateLayout(largeur, hauteur);
    grid = new Grid(largeur, hauteur);
    grid.addBombs(bombs);
    $('#nbbombes').text(grid.bombs + ' bombes');

    $('#menu').css('display', 'none');
    $('#gameboard').css('display', 'block');

    document.oncontextmenu = function () {
        return false;
    };

    $('.reset').each(function () {
        $(this).click(function () {
            $('#modal-lost').modal('hide');
            $('#modal-win').modal('hide');

            generateLayout(largeur, hauteur);
            firstLeftClick = true;
            firstClick = true;
            stopGame = false;
            timer.reset();
            grid = new Grid(largeur, hauteur);
            grid.addBombs(bombs);
            $('#nbbombes').text(grid.flags + ' bombes');


            $('td').each(function () {
                initEvents($(this));
            });

        });
    });

    $('.menu-back').each(function () {
        $(this).click(function () {
            stopGame = false;
            $('#modal-lost').modal('hide');
            $('#modal-win').modal('hide');

            $('#largeur').val(largeur);
            $('#hauteur').val(hauteur);
            $('#bombs').val(bombs);

            $('#menu').css('display', 'block');
            $('#gameboard').css('display', 'none');

        });
    });

    $('td').each(function () {
        initEvents($(this));
    });
}

function generateLayout(width, height) {
    $('table tbody').html('');
    for (var y = 0; y < height; y++) {
        var row = $("<tr></tr>");
        for (var x = 0; x < width; x++) {
            row.append($('<td data-x="' + x + '" data-y="' + y + '"></td>'))
        }
        $('table tbody').append(row);
    }
}


function initEvents(elem) {

    elem.mousedown(function (event) {

        var x = parseInt(elem.attr("data-x"));
        var y = parseInt(elem.attr("data-y"));

        if (event.button == 0) {
            console.log('clic du bouton gauche');

           if (firstLeftClick)
           {
             if (grid.cells[x][y].isBomb()){
               grid.moveOutBomb(x, y);
             }
             firstLeftClick=false;
           }

            var result = grid.reveal(x, y);

            result.cases.forEach(updateView);

            if (result.lost) {
                gameOverLose();
            }
            else {
                gameOverWin();
            }
        } else if (event.button == 2) {
            console.log('clic du bouton droit');

            grid.toggleFlag(x, y);

            updateView(grid.cells[x][y]);
            $('#nbbombes').text(grid.flags + ' bombes');
        }

        if (firstClick && (event.button == 0 || event.button  == 2)) {
            firstClick = false;
            timer.start();
        }
    });

    elem.dblclick(function () {
        console.log("test");

        var x = parseInt(elem.attr("data-x"));
        var y = parseInt(elem.attr("data-y"));

        if (grid.cells[x][y].flagged) {
            console.log('Erreur, il y a un drapeau');
        } else {
            if (grid.cells[x][y].isShown()) {
                result = grid.quickReveal(x, y);
                console.log(result.cases);

                result.cases.forEach(updateView);

                if (result.lost) {
                    gameOverLose()
                }
            }
        }
    });

}

function updateView(cell)
{
    var td = $('td[data-x="' + cell.x + '"][data-y="' + cell.y + '"]').removeClass();


    //console.log(cell);

    if (cell.isShown())
    {
        if (cell.isBomb())
        {
            td.addClass('bomb');
        }
        else {
            if (cell.isFlagged())
            {
                td.addClass('flagError');
            }
            else
            {
                if (cell.getValue() === 0)
                {
                    td.addClass('empty');
                }
                else
                {
                    td.addClass('number');
                    td.html(cell.getValue());
                }
            }
        }
    }
    else if (cell.isFlagged())
    {
        td.addClass('flag');
    } else if (stopGame && cell.isBomb()){
        td.addClass('bomb');
    }
}

function gameOverLose(elem) {
    timer.stop();
    $('#modal-lost').modal('show');
    bombCells = grid.getBombs();
    stopGame = true;
    bombCells.forEach(updateView);
    return stopGame;
}

function gameOverWin() {
    var i = 0;
    $('td').each(function () {
        if ($(this).hasClass('bomb')) {
            return false
        } else if (!$(this).hasClass('empty') && !$(this).hasClass('number')) {
            i += 1;
        } else if ($(this).hasClass('flag')) {
            i += 1;
        }
    });
    if (i == grid.bombs) {
        $('#modal-win').modal('show');
        stopGame = true;
        timer.stop();
        return stopGame;
    }
}

function updateTimer(){
  $('#timer').text(timer.get());

  setTimeout(updateTimer,500);
}
