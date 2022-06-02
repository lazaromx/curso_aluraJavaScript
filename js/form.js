var botaoAdicionar = document.querySelector("#adicionar-paciente");
botaoAdicionar.addEventListener("click", function(event){
    event.preventDefault()
    
    var form = document.querySelector("#form-adiciona");
    
    var paciente = obtemPacienteDoForm(form);

    

    var erros = validaPaciente(paciente);
    
    if(erros.length > 0){
        exibeMensagemDeErro(erros);
        return;
    }

    adicionaPacienteNaTabela(paciente);
    
    

    form.reset();

    var mensagemErro = document.querySelector("#mensagem-erro");
    mensagemErro.innerHTML = "";
});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = addTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function exibeMensagemDeErro(erros){
    var ul = document.querySelector("#mensagem-erro");
    ul.innerHTML="";
   
    erros.forEach(function(erro){
        var li = document.createElement("li");
        li.textContent = erro;
        ul.appendChild(li);
    });
  
}

function obtemPacienteDoForm(form){
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)

    }

    return paciente
}

function addTr(paciente){
    var pacienteTr = document.createElement("tr");

    pacienteTr.classList.add("paciente")

    var nomeTd = addTd(paciente.nome, "info-nome");
    var pesoTd = addTd(paciente.peso, "info-peso");
    var alturaTd = addTd(paciente.altura, "info-altura");
    var gorduraTd = addTd(paciente.gordura, "info-gordura");
    var imcTd = addTd(paciente.imc, "info-imc");
    
    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);
    
    return pacienteTr;
}

function addTd(dado, classe){
    var td = document.createElement("td");
    
    td.textContent = dado;
    td.classList.add(classe);

    return td;

}

function validaPaciente(paciente){
    
    var erros = [];

    if(!validaPeso(paciente.peso)){
        erros.push("O peso é inválido!");
    }

    if(!validaAltura(paciente.altura)){
        erros.push("A altura é inválida");
    }

    if(paciente.nome.length == 0){
        erros.push("O nome não pode ser em branco");
    }
    
    if(paciente.gordura.length == 0){
        erros.push("A gordura não pode ser em branco");
    }
    if(paciente.peso.length == 0){
        erros.push("O peso não pode ser em branco");
    }
    if(paciente.altura.length == 0){
        erros.push("A altura não pode ser em branco");
    }

    return erros;
}