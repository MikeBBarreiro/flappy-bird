var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

var bird, pipes, timer;
// var mainState = {

function preload(){
    game.load.image('sky', 'assets/sky4.png');
    game.load.image('bird', 'assets/min.png');
    game.load.image('pipe', 'assets/pipe.png');

  }


  function create(){
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0, 'sky');

    bird = game.add.sprite(100, 245, 'bird');
    bird.scale.setTo(0.6);
    // Add gravity to the bird to make it fall
    game.physics.arcade.enable(bird);
    bird.body.gravity.y = 1000;

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);

    // game.add.sprite(0,0, 'pipe');
    pipes = game.add.group(); // Create a group
    pipes.enableBody = true;  // Add physics to the group
    pipes.createMultiple(20, 'pipe'); // Create 20 pipes

    // this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    //
    // this.score = 0;
    // this.labelScore = game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
  }

  function update(){
  // If the bird is out of the world (too high or too low), call the 'restartGame' function
    if (bird.inWorld == false){
      this.restartGame();
    }

    game.physics.arcade.overlap(bird, pipes, restartGame, null, this);
  }

  function jump() {
    // Add a vertical velocity to the bird
    bird.body.velocity.y = -350;
    console.log('Fly!', bird);
  }


  function restartGame() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
  }

  function addOnePipe(x, y) {
    // Get the first dead pipe of our group
    pipes.getFirstDead();

    // Set the new position of the pipe
    pipe.reset(x, y);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    // Kill the pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
}

function addRowOfPipes() {
    // Pick where the hole will be
    var hole = Math.floor(Math.random() * 5) + 1;

    // Add the 6 pipes
    for (var i = 0; i < 8; i++){
      if (i != hole && i != hole + 1){
        this.addOnePipe(400, i * 60 + 10);
      }
    }

    this.score += 1;
    this.labelScore.text = this.score;
}

// };
// game.state.add('main', mainState);
// game.state.start('main');
