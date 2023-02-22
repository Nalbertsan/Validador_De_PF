
function main() {
  const inputCPF = document.querySelector('.input-CPF');
  const btnVerificar = document.querySelector('.btn-Validador');
  const resultado = document.querySelector('.resultado');

  inputCPF.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
      if (!inputCPF.value) return;
      verificadorDeCPF();
      limparTexto();
    }
  })

  btnVerificar.addEventListener('click', function (e) {
    if (!inputCPF.value) return;
    verificadorDeCPF();
    limparTexto();
  })

  function limparTexto() {
    inputCPF.value = '';
    inputCPF.focus();
  }

  const cpfLimpo = (express) => {
    const cpfNumerico = express.replace(/\D+/g, '');
    return cpfNumerico;
  };

  const transformarArray = () => {
    const cpfArray = Array.from(cpfLimpo(inputCPF.value))
    console.log(cpfArray);
    return cpfArray;
  }

  const contaCPF = (valorI, fimArray) => {
    let valorInicial = valorI;
    const arrayCPF = transformarArray().slice(0, fimArray);
    const numerosMult = arrayCPF.map(function (valor) {
      const result = Number(valor) * valorInicial;
      valorInicial -= 1;
      return result;
    }).reduce(function (ac, valor) {
      ac += valor;
      return ac;
    }, 0)
    return numerosMult;
  }

  const primeiroDigito = () => {
    const result = 11 - (contaCPF(10, 9) % 11);
    if (result > 9) return 0;
    return result;
  }

  const segundoDigito = () => {
    const result = 11 - (contaCPF(11, 10) % 11);
    if (result > 9) return 0;
    return result;
  }

  const verificadorDeCPF = () =>{
    const arrayCPF = transformarArray();
    if(arrayCPF.length === 11){
      const priDigito = primeiroDigito();
      const segDigito = segundoDigito();
      if(priDigito === Number(arrayCPF[9]) && segDigito === Number(arrayCPF[10])){
        resultado.innerHTML = `CPF: ${inputCPF.value} Válido`
      }
      else{
        resultado.innerHTML = `CPF: ${inputCPF.value} Inválido`
      }
    }else{
      resultado.innerHTML = `Erro! Não é um CPF`
    }
  }


}
main();