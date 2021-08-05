var door, doorImg;
var ghost, ghostImg;
var climber, climberImg;
var tower, towerImg;
var doorG, climberG;
var invisibleClimber, iCGroup;
var gameState = "play";

function preload() {
    doorImg = loadImage("door.png");
    ghostImg = loadImage("ghost-standing.png");
    climberImg = loadImage("climber.png");
    towerImg = loadImage("tower.png");
}

function setup() {
    createCanvas(600, 600);

    tower = createSprite(300, 300);
    tower.addImage(towerImg);
    tower.velocityY = 1;

    ghost = createSprite(200, 200, 50, 50);
    ghost.addImage(ghostImg);
    ghost.scale = 0.3;

    doorG = createGroup();
    climberG = createGroup();
    iCGroup = createGroup();
}

function draw() {
    background(0);

    if (gameState === "play") {
        if (tower.y > 400) {
            tower.y = 300;
        }

        if (keyDown("space")) {
            ghost.velocityY = -5;
        }
        //gravity
        ghost.velocityY = ghost.velocityY + 0.8;

        if (climberG.isTouching(ghost)) {
            ghost.velocityY = 0;
        }

        if (iCGroup.isTouching(ghost) || ghost.y > 600) {
            ghost.destroy();
            gameState = "end";
        }

        if (keyDown("left")) {
            ghost.x = ghost.x - 3;
        }

        if (keyDown("right")) {
            ghost.x = ghost.x + 3;
        }


        spawnDoors();

        drawSprites();
    }

    if (gameState === "end") {
        stroke("yellow");
        fill("yellow");
        textSize(30);
        text("Game Over", 230, 250);

    }

}

function spawnDoors() {
    if (frameCount % 240 === 0) {
        door = createSprite(200, -50);
        door.addImage(doorImg);
        door.velocityY = 1;
        door.x = Math.round(random(120, 400));
        door.lifetime = 800;
        doorG.add(door);


        climber = createSprite(200, 10);
        climber.addImage(climberImg);
        climber.velocityY = 1;
        climber.x = door.x;
        climber.lifetime = 800;
        climberG.add(climber);

        invisibleClimber = createSprite(200, 15);
        invisibleClimber.width = climber.width;
        invisibleClimber.height = 2;
        invisibleClimber.x = door.x;
        invisibleClimber.velocityY = 1;
        invisibleClimber.lifetime = 800;
        iCGroup.add(invisibleClimber);

        ghost.depth = door.depth;
        ghost.depth = ghost.depth + 1;
    }
}