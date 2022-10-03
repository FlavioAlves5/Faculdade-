const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const recomecarbotao = document.querySelector("[data-recomecar-botao]")  
let ehVezCircle;

const jogadasPossiveisGanhar = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const comecarJogo = () =>{
    ehVezCircle = false;

    for (const cell of cellElements){
        cell.classList.remove("circle");
        cell.classList.remove("x");
        cell.removeEventListener("click", handleClick)
        cell.addEventListener("click", handleClick, {once:true});
    };

    setBoardHoverClass();
    winningMessage.classList.remove("mostrar-vencedor-mensagem")
};

const fimDeJogo = (empate) =>{
    if (empate){
        winningMessageTextElement.innerText = 'Empate!'
    } else{
        winningMessageTextElement.innerText = ehVezCircle ? 'Circulo Venceu' : 'X Venceu';
    }
    winningMessage.classList.add("mostrar-vencedor-mensagem");
};


const verificarGanhador = (jogadorAtual) => {
    return jogadasPossiveisGanhar.some((combinacoes) => {return combinacoes.every((index) =>{
        return cellElements[index].classList.contains(jogadorAtual);
    });
    });
};

verificarEmpate = () => {
    return [...cellElements].every(cell=>{
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const coloqueMarca = (cell, classToAdd)=>{
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () =>{
    board.classList.remove("circle");
    board.classList.remove("x");

    if(ehVezCircle){
        board.classList.add("circle");
    } else {
        board.classList.add("x");
    }
};

const troqueJogador = () =>{
    ehVezCircle = !ehVezCircle;
    setBoardHoverClass();
};
  
const handleClick = (e) => {
    //colocar o simbolo (x ou circle)
    const cell = e.target;
    const classToAdd = ehVezCircle ? "circle" : "x";

    coloqueMarca(cell, classToAdd);
    
    //Verificar Ganhador
    const seTemGanhador = verificarGanhador(classToAdd);
    //Verificar Empate
    const ehEmpate = verificarEmpate();
    if (seTemGanhador) {
        fimDeJogo(false)
        alert(" Temos um ganhador, Click em OK e em seguida Reiniciar" );
    } else if(ehEmpate){
        fimDeJogo(true)
    } else{

            //Mudar o Simbolo
    troqueJogador();
};
    };



comecarJogo();

recomecarbotao.addEventListener("click", comecarJogo );
