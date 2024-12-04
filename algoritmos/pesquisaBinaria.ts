function pesquisaBinaria(lista: number[], item: number){
    let minimo: number  = 0;
    let maximo: number  = lista.length - 1;
    
    while(minimo <= maximo){
        let meio: number  = Math.floor((minimo + maximo) / 2);
        let chute: number = lista[meio]

        if(item == chute){
            return console.log(`O item ${item} esta na lista e ocupa a posição ${meio}`);
        }

        if(item > chute){
            minimo = meio;
            console.log(minimo)
            console.log('O item era maior que o chute')
        }else{
            maximo = meio;
            console.log(maximo)
            console.log('O item era menor que o chute')
        }

        if(minimo >= maximo){
            return 'O item não está na lista!';
        }
    }
}

const listaTeste: number[] = [1, 3, 4, 7, 8, 9, 11, 15, 17, 20, 21, 22, 25, 26, 29, 30, 31,32,33, 34, 35];
const itemTeste: number = 29;

pesquisaBinaria(listaTeste, itemTeste);