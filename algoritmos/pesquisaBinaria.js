function pesquisaBinaria(lista, item) {
    var minimo = 0;
    var maximo = lista.length - 1;
    while (minimo <= maximo) {
        var meio = Math.floor((minimo + maximo) / 2);
        var chute = lista[meio];
        if (item == chute) {
            return console.log("O item ".concat(item, " esta na lista e ocupa a posi\u00E7\u00E3o ").concat(meio));
        }
        if (item > chute) {
            minimo = meio;
            console.log(minimo);
            console.log('O item era maior que o chute');
        }
        else {
            maximo = meio;
            console.log(maximo);
            console.log('O item era menor que o chute');
        }
        if (minimo >= maximo) {
            return 'O item não está na lista!';
        }
    }
}
var listaTeste = [1, 3, 4, 7, 8, 9, 11, 15, 17, 20, 21, 22, 25, 26, 29, 30, 31, 32, 33, 34, 35];
var itemTeste = 29;
pesquisaBinaria(listaTeste, itemTeste);
