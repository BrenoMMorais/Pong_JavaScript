//------------------------------- Variaveis -------------------------------//

//Variaveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 22;
let raio = diametro / 2;

//Velocidade da Bolinha
let veloXBall = 6;
let veloYBall = 6;

//Variaveis da Minha Raquete
let xRaquete = 5;
let yRaquete = 150;
let larguraRaquete = 13;
let alturaRaquete = 90;
let bordaRaquete = 5;
let veloYRaquete = 5;

//Variaveis da Raquete Oponente
let xRaqueteOponente = 583;
let yRaqueteOponente = 150;
let larguraRaqueteOponente = 13;
let alturaRaqueteOponente = 90;
let veloYRaqueteOponente;

//Variaveis de Pontos
let meusPontos = 0;
let pontosOponente = 0;
let chanceErro = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//--------------------------- Functions -------------------------------------//

function preload(){
  trilha = loadSound("trilha.mp3");
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  limiteRaquete();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha,yBolinha,diametro);
}

function movimentaBolinha(){
  xBolinha += veloXBall;
  yBolinha += veloYBall;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    veloXBall *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0){
    veloYBall *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, larguraRaquete, alturaRaquete, bordaRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
    if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + larguraRaquete
     && yBolinha - raio < yRaquete + alturaRaquete
     && yBolinha + raio > yRaquete){
    veloXBall *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  veloYRaqueteOponente = yBolinha - yRaqueteOponente - alturaRaqueteOponente / 2 - 30;
  yRaqueteOponente += veloYRaqueteOponente;
  calculaChanceErro();
}

function verificaColisaoRaqueteOponente(){
  if (xBolinha + raio > xRaqueteOponente
     && yBolinha - raio < yRaqueteOponente + alturaRaqueteOponente
     && yBolinha + raio > yRaqueteOponente){
    veloXBall *= -1;
    raquetada.play();
  }
}

function incluiPlacar(){
  textSize(25);
  textAlign(CENTER);
  fill(color(150, 0, 150));
  rect(230, 8, 40, 25, 10);
  fill(255);
  text(meusPontos, 250, 30);
  fill(color(150, 0, 150));
  rect(330, 8, 40, 25, 10);
  fill(255);
  text(pontosOponente, 350, 30);
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}

function limiteRaquete(){
  if (yRaquete < 0) {
    yRaquete = 0;
  }
  else if (yRaquete > 400 - alturaRaquete) {
    yRaquete = 400 - alturaRaquete;
  }
  else if (yRaqueteOponente < 0) {
    yRaqueteOponente = 0;
  }
  else if (yRaqueteOponente > 400 - alturaRaquete) {
    yRaqueteOponente = 400 - alturaRaquete;
  }
}

function calculaChanceErro() {
  if (pontosOponente >= meusPontos) {
    chanceErro += 1
    if (chanceErro >= 39){
    chanceErro = 40
    }
  } else {
    chanceErro -= 1
    if (chanceErro <= 35){
    chanceErro = 35
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}