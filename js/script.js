/**
 * Created by Lucas on 30/01/2017.
 */

document.addEventListener('contextmenu', function (event) {
    event.preventDefault()
});

$(document).ready(function () {
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
        if ($('#largeur').val() != "" && $('hauteur').val() != "" && $('#bombs').val() != "") {
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
            grid = new Grid(largeur, hauteur);
            grid.addBombs(bombs);
            $('#nbbombes').text(grid.flags + ' bombes');


            $('td').each(function () {
                initEvents($(this));
            });

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

            if (grid.cells[x][y].flagged) {
                console.log('Erreur, il y a un drapeau');
            } else {
                if (!grid.cells[x][y].isShown()) {
                    if (grid.cells[x][y].isBomb()) {
                        elem.addClass("bomb");
                        gameOverLose();
                    } else if (grid.cells[x][y].value == 0) {
                        elem.addClass("empty");
                        cases = grid.reveal(x, y);
                        cases.forEach(function (el) {
                            if (el.value == 0) {
                                $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('empty');
                            } else {
                                $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('number');
                                $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').html(el.getValue());
                            }
                        })
                    } else {
                        elem.addClass("number");
                        elem.html(grid.cells[x][y].getValue())
                    }
                    grid.cells[x][y].shown = true;
                    gameOverWin();
                }
            }

        } else if (event.button == 2) {
            console.log('clic du bouton droit');
            if (!grid.cells[x][y].isShown()) {
                if (grid.cells[x][y].isFlagged()) {
                    grid.cells[x][y].setFlagged(false);
                    elem.removeClass('flag');
                    grid.flags += 1;
                } else if (grid.flags > 0) {
                    grid.cells[x][y].setFlagged(true);
                    elem.addClass('flag');
                    grid.flags -= 1;
                } else if (grid.flags == 0) {
                    console.log('Nombre max de drapeau atteint !');
                }
                $('#nbbombes').text(grid.flags + ' bombes');
                console.log('Nombre de bombes : ' + grid.flags);
            }
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

                result.cases.forEach(function (el) {
                    if (el.value == 0) {
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('empty');
                    }
                    else if (el.flagged && !el.isBomb()) {
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').removeClass('flag');
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('flagError');
                    }
                    else if (el.isBomb()) {
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('bomb');
                    }
                    else {
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').addClass('number');
                        $('td[data-x="' + el.x + '"][data-y="' + el.y + '"]').html(el.value);
                    }
                });


                if (result.lost){
                    // Perdu!

                if (result.lost) {
                    gameOverLose()
                }
            }
        }

    })

}

function gameOverLose(elem) {
    $('#modal-lost').modal('show');
    return true;
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
        console.log(i);
        $('#modal-win').modal('show');
        return true;
    }
}
