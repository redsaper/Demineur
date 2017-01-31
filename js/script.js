/**
 * Created by Lucas on 30/01/2017.
 */

document.addEventListener('contextmenu', event => event.preventDefault());

$(document).ready(function () {

    $('button#validate').click(function () {
        if ($('#largeur').val() != "" && $('hauteur').val() != "" && $('#bombs').val() != "") {
            largeur = parseInt($('#largeur').val());
            hauteur = parseInt($('#hauteur').val());
            bombs = parseInt($('#bombs').val());

            if (!isNaN(largeur) && !isNaN(hauteur) && !isNaN(bombs)){
                if (testParameters(largeur,hauteur,bombs)) {
                    initGameboard();
                }
            }
        }
    });

});


function testParameters(largeur, hauteur, bombs) {

    if ( ((largeur * hauteur)/3)*2 >= bombs ){
        if (largeur <= 40 && hauteur <= 50){
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

    $('#reset').click(function () {
        generateLayout(20,20);
        grid = new Grid(20, 20);
        grid.addBombs(50);
        $('#nbbombes').text(grid.flags + ' bombes');


        $('td').each(function () {
            initEvents($(this));
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


function initEvents(elem){

    elem.mousedown(function (event) {

        var x = parseInt(elem.attr("data-x"));
        var y = parseInt(elem.attr("data-y"));

        if (event.button == 0) {
            console.log('clic du bouton gauche');
            console.log(grid.cells[x][y].value);

            if (grid.cells[x][y].flagged) {
                console.log('Erreur, il y a un drapeau');
            } else {
                if (!grid.cells[x][y].shown) {
                    if (grid.cells[x][y].value == "B") {
                        elem.addClass("bomb");
                    } else if (grid.cells[x][y].value == 0) {
                        elem.addClass("empty");
                    } else {
                        elem.addClass("number");
                        elem.html(grid.cells[x][y].value)
                    }
                    grid.cells[x][y].shown = true;
                }
            }

        } else if (event.button == 2) {
            console.log('clic du bouton droit');
            if (!grid.cells[x][y].shown) {
                if (grid.cells[x][y].flagged) {
                    grid.cells[x][y].flagged = false;
                    elem.removeClass('flag');
                    grid.flags += 1;
                } else if (grid.flags > 0) {
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
    })

}




