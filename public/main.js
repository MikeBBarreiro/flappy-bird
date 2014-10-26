var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv', { preload: preload, create: create, update: update });

var bird;
// var mainState = {

function preload(){
    game.load.image('sky', 'assets/sky4.png');
    game.load.image('bird', 'assets/birdFlap.png');

  }


  function create(){
    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0, 'sky');

    bird = game.add.sprite(100, 245, 'bird');
    bird.scale.setTo(0.2);
    // Add gravity to the bird to make it fall
    game.physics.arcade.enable(bird);
    bird.body.gravity.y = 1000;

    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(jump, this);
  }

  function update(){
  // If the bird is out of the world (too high or too low), call the 'restartGame' function
    if (bird.inWorld == false){
      this.restartGame();
    }
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

// };
// game.state.add('main', mainState);
// game.state.start('main');
