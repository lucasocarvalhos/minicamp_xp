function operacoesMatematicas() {
    const btn = document.querySelector("button");

    btn.addEventListener("click", () => {
        const num1 = Number(document.querySelector("#num1").value);
        const num2 = Number(document.querySelector("#num2").value);
        
        const resultados = document.querySelectorAll(".result span");

        resultados[0].textContent = soma(num1, num2);
        resultados[1].textContent = subtr(num1, num2);
        resultados[2].textContent = subtr(num2, num1);
        resultados[3].textContent = mult(num1, num2);
        resultados[4].textContent = divisao(num1, num2);
        resultados[5].textContent = divisao(num2, num1);
        resultados[6].textContent = pot(num1, num2);
        resultados[7].textContent = pot(num2, num1);
        resultados[8].textContent = sqrt(num1);
        resultados[9].textContent = sqrt(num2);
        resultados[10].textContent = fat(num1);
        resultados[11].textContent = fat(num2);
        resultados[12].textContent = porcent(num1, num2);
        resultados[13].textContent = porcent(num2, num1);
        resultados[14].textContent = media(num1, num2);
    })
    
}

function media(num1, num2) {
    return (num1+num2)/2
}

function porcent(num1, num2) {
    const porcento = Number(divisao(num1, num2))*100;
    return `${porcento} %`;
}

function fat(num) {
    if (num === 0) {
        return 1;
    }

    return num*fat(num-1)
}

function sqrt(num) {
    return Math.sqrt(num).toFixed(2);
}

function pot(num1, num2) {
    return num1**num2;
}

function divisao(num1, num2) {
    return (num1/num2).toFixed(2);
}

function mult(num1, num2) {
    return num1*num2;
}

function subtr(num1, num2) {
    return num1 - num2;
}

function soma(num1, num2) {
    return num1 + num2;
}

operacoesMatematicas();