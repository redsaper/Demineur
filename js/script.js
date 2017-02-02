/**
 * Created by Lucas on 30/01/2017.
 */

document.addEventListener('contextmenu', function (event) {
    event.preventDefault()
});

$(document).ready(function () {
    stopGame = false;
    firstClick = true;

    $('select#niveau').change(function(){   // Selection du niveau
      console.log($('select#niveau').val());
      switch ($('select#niveau').val()) {
        case "Facile":
          $('#largeur').val(15);
          $('#hauteur').val(15);
          $('#bombs').val(25);
          break;
        case "Moyen":
          $('#largeur').val(20);
          $('#hauteur').val(20);
          $('#bombs').val(50);
          break;
        case "Difficile":
          $('#largeur').val(30);
          $('#hauteur').val(30);
          $('#bombs').val(130);
          break;
        default:

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
        if (largeur <= 40 && hauteur <= 50) {
            return true;
        }
    }
    return false;
}


function initGameboard() {
    stopGame = false;
    firstClick = true;
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
            firstClick = true;
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
            if (!grid.timer) {
              timer();
            }

           if (firstClick)
           {
             if (grid.cells[x][y].isBomb()){
               grid.moveOutBomb(x, y);
             }
             firstClick=false;
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

    console.log(cell);

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
    }
}

function gameOverLose(elem) {
    $('#modal-lost').modal('show');
    bombCells = grid.getBombs();
    bombCells.forEach(updateView);
    stopGame = true;
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
        return stopGame;
    }
}

function timer(){
  if (!grid.timer) {
    grid.timer = true;
  }
  grid.second++;
  $('#timer').text(grid.second);

  compte=setTimeout(function() {
    if (!stopGame) {
      timer();
    }
  },1000)
}
