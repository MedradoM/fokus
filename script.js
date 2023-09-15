
const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const header = document.getElementById('app__header')
const listAll = header.classList;
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarImg = document.querySelector('#start-pause img')
const musicaFocoInput = document.querySelector('#alternar-musica')
const tempoNaTela = document.getElementById('timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const startMsc = new Audio('./sons/play.wav')
const pauseMsc = new Audio('./sons/pause.mp3')
const endMsc = new Audio('./sons/beep.mp3')
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () =>{
    if(musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

window.addEventListener('scroll', () => {
    if (window.scrollY > 0){
        listAll.add('changeStyle');
    } else {
        listAll.remove('changeStyle');
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active');
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade, <br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta.<strong>
            `            
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa.<strong>                
            `
            break;
        default:
            break;
    
    }
}

const start = document.getElementById('start-pause');
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        console.log('tempo finalizado!')
        endMsc.play();
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}

start.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        zerar();
        pauseMsc.play()
        return;
    }
    startMsc.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarImg.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarImg.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null;
}

const mostrarTempo = ()=>{
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pr-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
