
let player;
let obstacles = [];
let fruits = [];
let city;
let pedras = [];
let vidas = 1;
let gameOver = false;
let win = false;
let invencivel = false;
let tempoInvencivel = 0;
let velocidade = 1;

function setup() {
  createCanvas(600, 600);
  background(139, 69, 19); // marrom escuro
  
  // cria o jogador
  player = {
    x: 50,
    y: 50,
    emoji: "🏃"
  };
  
  // cria os obstáculos
  for (let i = 0; i < 50; i++) {
    let x, y;
    let overlap = true;
    while (overlap) {
      x = random(20, 580);
      y = random(20, 580);
      overlap = false;
      for (let j = 0; j < obstacles.length; j++) {
        if (dist(x, y, obstacles[j].x, obstacles[j].y) < 40) {
          overlap = true;
          break;
        }
      }
      // Verifica se o obstáculo está muito perto do jogador
      if (dist(x, y, player.x, player.y) < 50) {
        overlap = true;
      }
    }
    obstacles.push({ x: x, y: y, emoji: "🌳" });
  }
  
  // cria as pedras
  for (let i = 0; i < 10; i++) {
    let x, y;
    let overlap = true;
    while (overlap) {
      x = random(20, 580);
      y = random(20, 580);
      overlap = false;
      for (let j = 0; j < obstacles.length; j++) {
        if (dist(x, y, obstacles[j].x, obstacles[j].y) < 40) {
          overlap = true;
          break;
        }
      }
      for (let j = 0; j < pedras.length; j++) {
        if (dist(x, y, pedras[j].x, pedras[j].y) < 40) {
          overlap = true;
          break;
        }
      }
      // Verifica se a pedra está muito perto do jogador
      if (dist(x, y, player.x, player.y) < 50) {
        overlap = true;
      }
    }
    pedras.push({ x: x, y: y, emoji: "🪨" });
  }
  
  // cria as frutas
  for (let i = 0; i < 6; i++) {
    fruits.push({ x: random(50, 550), y: random(50, 550), emoji: random(["🍎", "🍓", "🍑", "🍊", "🍉"]) });
  }
  
  // cria a cidade
  city = { x: 585, y: 587, emoji: "🏙️" };
}

function draw() {
  background(139, 69, 19); // marrom escuro
  
  // desenha os obstáculos
  for (let i = 0; i < obstacles.length; i++) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(obstacles[i].emoji, obstacles[i].x, obstacles[i].y);
  }
  
  // desenha as pedras
  for (let i = 0; i < pedras.length; i++) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(pedras[i].emoji, pedras[i].x, pedras[i].y);
  }
  
  // desenha as frutas
  for (let i = 0; i < fruits.length; i++) {
    textSize(32);
    textAlign(CENTER, CENTER);
    text(fruits[i].emoji, fruits[i].x, fruits[i].y);
  }
  
  // desenha a cidade
  textSize(32);
  textAlign(CENTER, CENTER);
  text(city.emoji, city.x, city.y);
  
  // desenha o jogador
  textSize(32);
  textAlign(CENTER, CENTER);
  text(player.emoji, player.x, player.y);
  
  // verifica colisão com obstáculos
  if (!invencivel) {
    for (let i = 0; i < obstacles.length; i++) {
      if (dist(player.x, player.y, obstacles[i].x, obstacles[i].y) < 20) {
        vidas--;
        invencivel = true;
        tempoInvencivel = millis();
        if (vidas <= 0) {
          gameOver = true;
        }
        break; //sai do loop após perder uma vida
      }
    }
  } else {
    if (millis() - tempoInvencivel > 1500) {
      invencivel = false;
    }
  }
  // verifica colisão com pedras
for (let i = 0; i < pedras.length; i++) {
  if (dist(player.x, player.y, pedras[i].x, pedras[i].y) < 20) {
    vidas -= 2;
    invencivel = true;
    tempoInvencivel = millis();
    if (vidas <= 0) {
      gameOver = true;
    }
  }
}
  
  // verifica colisão com frutas
  for (let i = 0; i < fruits.length; i++) {
    if (dist(player.x, player.y, fruits[i].x, fruits[i].y) < 20) {
      fruits.splice(i, 1);
      vidas++; // ganha uma vida
    }
  }
  
  // verifica colisão com a cidade
  if (dist(player.x, player.y, city.x, city.y) < 20) {
    win = true;
  }
  
  // reinicia o jogo se perder
  if (gameOver) {
    background(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!", width/2, height/2);
    delay(1000);
    setup();
    gameOver = false;
  }
  
  // mostra mensagem de vitória se ganhar
  if (win) {
    background(0, 255, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Você ganhou!", width/2, height/2);
    noLoop();
  }
  
  // mostra vidas
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Vidas: " + vidas, 10, 10);
}

function mouseMoved() {
  player.x = mouseX;
  player.y = mouseY;
}