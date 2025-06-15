const instrumentosFamilias = {
  "Violino": "Cordas",
  "Viola": "Cordas",
  "Violoncelo": "Cordas",
  "Flauta Transversal": "Madeiras",
  "Oboé": "Madeiras",
  "Oboé D'Amore": "Madeiras",
  "Corne Inglês":"Madeiras", 
  "Fagote": "Madeiras",
  "Clarinete": "Madeiras",
  "Clarinete Alto": "Madeiras",
  "Clarinete Baixo": "Madeiras",
  "Saxofone Soprano": "Madeiras",
  "Saxofone alto": "Madeiras",
  "Saxofone tenor": "Madeiras",
  "Saxofone Barítono": "Madeiras",
  "Trompetet": "Metais",
  "Cornet": "Metais",
  "Flugelhorn": "Metais",
  "Trompa": "Metais",
  "Trombone": "Metais",
  "Eufônio": "Metais",
  "Tuba": "Metais",
};

const alunos = [];

const select = document.getElementById("instrumento");
for (let inst of Object.keys(instrumentosFamilias).sort()) {
  let option = document.createElement("option");
  option.value = inst;
  option.textContent = inst.charAt(0).toUpperCase() + inst.slice(1);
  select.appendChild(option);
}

function adicionarInstrumento() {

  const instrumento = select.value;
  if (!instrumento){
    alert("Por Favor, selecione um instrumento antes de adicionar.");
    return;

  }    

  alunos.push(instrumento);
  select.value = "";
  atualizarLista();
}

function removerSelecionados() {
  const checkboxes = document.querySelectorAll('.instrumento-checkbox');
  const selecionados = [];

  checkboxes.forEach((cb, index) => {
    if (cb.checked) {
      selecionados.push(index);
    }
  });

  if(selecionados.length === 0){
    alert("Por Favor, selecione pelo menos um Instrumento para remover.");
    return;
  }

  // Remover de trás pra frente
  selecionados.reverse().forEach(index => {
    alunos.splice(index, 1);
  });

  atualizarLista();
}

function atualizarLista() {
  const total = alunos.length;

  const contagem = {
    cordas: 0,
    madeiras: 0,
    metais: 0
  };

alunos.forEach(inst => {
  const familia = instrumentosFamilias[inst];
  if (familia) {
    contagem[familia.toLowerCase()]++;
  }
});


  // Atualiza checkboxes para remover instrumentos
  const listaInstrumentosDiv = document.getElementById("lista-instrumentos");
  listaInstrumentosDiv.innerHTML = "";
  alunos.forEach((inst, index) => {
    const div = document.createElement("div");
    div.style.marginBottom = "4px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "instrumento-checkbox";
    checkbox.id = `check-${index}`;

    const label = document.createElement("label");
    label.htmlFor = `check-${index}`;
    const familia = instrumentosFamilias[inst];
    label.textContent = `${inst.charAt(0).toUpperCase() + inst.slice(1)} (${familia})`;


    div.appendChild(checkbox);
    div.appendChild(label);
    listaInstrumentosDiv.appendChild(div);
  });

  // Atualiza o estado de equilíbrio
  const proporcoes = {
    cordas: contagem.cordas / total || 0,
    madeiras: contagem.madeiras / total || 0,
    metais: contagem.metais / total || 0
  };

  const desvioMax = Math.max(
    Math.abs(proporcoes.cordas - 0.5),
    Math.abs(proporcoes.madeiras - 0.25),
    Math.abs(proporcoes.metais - 0.25)
  );

  const estadoDiv = document.getElementById("estado-equilibrio");
    estadoDiv.className = "estado";

    if (total === 0) {
    estadoDiv.textContent = "";
    estadoDiv.style.display = "none";
    } else {
        estadoDiv.style.display = "block";

        if (total < 2 || desvioMax > 0.3) {
            estadoDiv.textContent = "Orquestra em desequilíbrio";
            estadoDiv.classList.add("desequilibrada");
        } else if (desvioMax > 0.1) {
            estadoDiv.textContent = "A caminho do equilíbrio";
            estadoDiv.classList.add("caminho");
        } else {
            estadoDiv.textContent = "Orquestra equilibrada";
            estadoDiv.classList.add("equilibrada");
        }
    }
const areaInstrumentos = document.getElementById("area-instrumentos");
areaInstrumentos.style.display = total === 0 ? "none" : "block";


  // Atualiza visibilidade do botão de remoção
  const botaoRemover = document.getElementById("botao-remover");
  botaoRemover.style.display = total === 0 ? "none" : "inline-block";

  const sugestaoDiv = document.getElementById("sugestao");

    if (total === 0) {
    sugestaoDiv.textContent = "";
    sugestaoDiv.style.display = "none"; // esconde totalmente
    return;
    }

    // se houver instrumentos, mostra a sugestão normalmente
    sugestaoDiv.style.display = "block";


  const ideais = {
  cordas: 0.5,
  madeiras: 0.25,
  metais: 0.25
};

const faltas = {
  cordas: Math.max(0, ideais.cordas - proporcoes.cordas),
  madeiras: Math.max(0, ideais.madeiras - proporcoes.madeiras),
  metais: Math.max(0, ideais.metais - proporcoes.metais)
};

const familiaMaisDesequilibrada = Object.entries(faltas).sort((a, b) => b[1] - a[1])[0][0];


  sugestaoDiv.innerHTML = `
    Sugestão: Para melhorar o equilibrio adicione mais instrumentos da familia <strong>${familiaMaisDesequilibrada}</strong>.
  `;

}

window.addEventListener("DOMContentLoaded", () => {
  const titulo = document.querySelector(".titulo");
  const texto = titulo.dataset.texto;

  titulo.innerHTML = ""; // Limpa o conteúdo original

  texto.split("").forEach((letra, index) => {
    const span = document.createElement("span");

    // Se for espaço, adicione um span com um espaço visível
    if (letra === " ") {
      span.innerHTML = "&nbsp;";
    } else {
      span.textContent = letra;
    }

    span.style.setProperty("--i", index);
    titulo.appendChild(span);
  });
});


