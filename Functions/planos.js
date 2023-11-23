function calcularIMC() {
    var altura = parseFloat(document.getElementById("altura").value);
    var peso = parseFloat(document.getElementById("peso").value);
    var idade = parseInt(document.getElementById("idade").value);

    if (isNaN(altura) || isNaN(peso) || isNaN(idade)) {
        alert("Por favor, insira valores válidos.");
        return;
    }

    var imc = peso / (altura * altura);

    criarCards(imc, idade);
}

function criarCards(imc, idade) {
    var planosEmpresa1 = calcularPlanosEmpresa1(imc, idade);
    var planosEmpresa2 = calcularPlanosEmpresa2(imc, idade);

    // Mostra os cards das empresas
    var cardEmpresa1 = document.getElementById("card-empresa1");
    var cardEmpresa2 = document.getElementById("card-empresa2");
    cardEmpresa1.style.display = "block";
    cardEmpresa2.style.display = "block";

    document.getElementById("basico-empresa1").textContent = "Essencial Invencível: R$" + planosEmpresa1.basico.toFixed(2);
    document.getElementById("standard-empresa1").textContent = "Resiliência Elevada: R$" + planosEmpresa1.standard.toFixed(2);
    document.getElementById("premium-empresa1").textContent = "Invencibilidade Total: R$" + planosEmpresa1.premium.toFixed(2);
    //separei as empresas
    document.getElementById("basico-empresa2").textContent = "BaseGuard: R$" + planosEmpresa2.basico.toFixed(2);
    document.getElementById("standard-empresa2").textContent = "ShieldPlus: R$" + planosEmpresa2.standard.toFixed(2);
    document.getElementById("premium-empresa2").textContent = "EliteCare: R$" + planosEmpresa2.premium.toFixed(2);

    var melhorPlano = calcularMelhorPlano(planosEmpresa1, planosEmpresa2);
    exibirMelhorPlano(melhorPlano);
}

function calcularMelhorPlano(planosEmpresa1, planosEmpresa2) {
    var melhorPlano = {
        tipo: "Nenhum",
        valor: Infinity
    };

    if (planosEmpresa1.basico < melhorPlano.valor) {
        melhorPlano = { tipo: "Essencial Invencível", valor: planosEmpresa1.basico };
    }

    if (planosEmpresa2.basico < melhorPlano.valor) {
        melhorPlano = { tipo: "BaseGuard", valor: planosEmpresa2.basico };
    }

    if (planosEmpresa1.standard < melhorPlano.valor) {
        melhorPlano = { tipo: "Resiliência Elevada", valor: planosEmpresa1.standard };
    }

    if (planosEmpresa2.standard < melhorPlano.valor) {
        melhorPlano = { tipo: "ShieldPlus", valor: planosEmpresa2.standard };
    }

    if (planosEmpresa1.premium < melhorPlano.valor) {
        melhorPlano = { tipo: "Invencibilidade Total", valor: planosEmpresa1.premium };
    }

    if (planosEmpresa2.premium < melhorPlano.valor) {
        melhorPlano = { tipo: "EliteCare", valor: planosEmpresa2.premium };
    }

    return melhorPlano;
}

function exibirMelhorPlano(melhorPlano) {
    var cardMelhorPlano = document.getElementById("melhor-plano");
    cardMelhorPlano.style.display = "block";

    document.getElementById("melhor-plano-descricao").textContent =
        "RECOMENDADO: Melhor Plano - " + melhorPlano.tipo + ": R$" + melhorPlano.valor.toFixed(2);
}

function calcularPlanosEmpresa1(imc, idade) {
    var basico = 100 + (idade * 10 * (imc / 10));
    var standard = (150 + (idade * 15)) * (imc / 10);
    var premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    return { 
         basico,
         standard,
         premium };
}

function calcularPlanosEmpresa2(imc, fatorComorbidade) {
    var basico, standard, premium;

    if (imc < 18.5) {
        fatorComorbidade = 10;
    } else if (imc >= 18.5 && imc < 24.9) {
        fatorComorbidade = 1;
    } else if (imc >= 24.9 && imc < 29.9) {
        fatorComorbidade = 6;
    } else if (imc >= 29.9 && imc < 34.9) {
        fatorComorbidade = 10;
    } else if (imc >= 34.9 && imc < 39.9) {
        fatorComorbidade = 20;
    } else {
        fatorComorbidade = 30;
    }

    basico = 100 + (fatorComorbidade * 10 * (imc / 10));
    standard = (150 + (fatorComorbidade * 15)) * (imc / 10);
    premium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    return { 
          basico,
          standard,
          premium };
}

function encaminharCadastro() {
    window.location.href = "cadastrarCliente.html";
}
