let trees = [];
const totalTrees = 20;
let points = 0;
let startTime;
let gameDuration = 10000; // 10 segundos em milissegundos
let gameOver = false;

function setup() {
  createCanvas(800, 600);
  // Criar árvores em posições aleatórias
  for (let i = 0; i < totalTrees; i++) {
    let x = random(50, width - 50);
    let y = random(200, height - 50);
    trees.push(new Tree(x, y));
  }
  startTime = millis();
}

function draw() {
  background(220);
  
  // Mostrar o personagem
  drawPerson();

  // Mostrar árvores
  for (let tree of trees) {
    tree.show();
  }

  // Mostrar pontos
  fill(0);
  textSize(20);
  text("Pontos: " + points, 20, 30);

  // Mostrar tempo restante
  let elapsed = millis() - startTime;
  let remaining = max(0, gameDuration - elapsed);
  fill(0);
  textSize(20);
  text("Tempo: " + ceil(remaining/1000) + "s", 20, 60);

  // Verificar se o tempo acabou ou se ganhou
  if (elapsed >= gameDuration) {
    gameOver = true;
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Fim do jogo! Pontuação: " + points, width/2, height/2);
  } else if (points >= totalTrees) {
    gameOver = true;
    fill(0);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Você ganhou! Pontuação: " + points, width/2, height/2);
  }
}

function drawPerson() {
  fill(0);
  rect(50, height - 100, 20, 50); // corpo
  ellipse(60, height - 120, 20, 20); // cabeça
  rect(40, height - 100, 10, 30); // braço esquerdo
  rect(70, height - 100, 10, 30); // braço direito
  rect(50, height - 50, 10, 50); // perna esquerda
  rect(60, height - 50, 10, 50); // perna direita
}

function mousePressed() {
  if (gameOver) return;
  // Verificar se clicou em alguma árvore
  for (let tree of trees) {
    if (!tree.grew && dist(mouseX, mouseY, tree.x, tree.y) < tree.size / 2) {
      tree.grow();
      points++;
    }
  }
}

class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 30; // tamanho inicial aumentado
    this.maxSize = 150; // tamanho máximo maior
    this.grew = false; // se foi regada
  }

  grow() {
    if (this.size < this.maxSize) {
      this.size += 15; // cresce em etapas maiores
      this.grew = true;
    }
  }

  show() {
    fill(34, 139, 34);
    ellipse(this.x, this.y - this.size / 2, this.size, this.size);
    // Tronco mais robusto e maior
    fill(139, 69, 19);
    rect(this.x - 6, this.y, 12, 20);
  }
}
