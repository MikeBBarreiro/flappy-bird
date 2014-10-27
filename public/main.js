
// preload: function(){
//     game.load.image('sky', 'assets/sky4.png');
//     game.load.image('bird', 'assets/min.png');
//     game.load.image('pipe', 'assets/pipe.png');
//
//   },


//init phaser, and create a 400x490px game

var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

//main state

var mainState = {
  preload: function(){
    // bg color
    // game.stage.backgroundColor = '#71c5cf';
    // background
    game.load.image('sky', 'assets/sky4.png');

    //load bird sprite
    game.load.image('bird', '/assets/min.png');

    //load pipe
    game.load.image('pipe', '/assets/pipe.png');

  },

  create: function(){
    //set physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    // display background
    game.add.sprite(0,0, 'sky');

    //display bird
    this.bird = this.game.add.sprite(100, 245, 'bird');
    this.bird.scale.setTo(0.5);
    // this.bird.angle = 100

    //add gravity to the bird
    game.physics.arcade.enable(this.bird);
    //this.game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    //space key to jump
    var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    //pipes
    this.pipes = game.add.group(); //create group
    this.pipes.enableBody = true; //add physics to the group;
    this.pipes.createMultiple(20, 'pipe'); //make 20 pipes

    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", {font: "30px Arial", fill: "#ffffff"});

    // changes the anchor spot
    this.bird.anchor.setTo(-0.2, 0.5);

  },

  addOnePipe: function(x, y) {
    //get first dead piep
    var pipe = this.pipes.getFirstDead();

    //set its position
    pipe.reset(x, y);

    //give it velocity
    pipe.body.velocity.x = -200;

    //kill pipe when it's no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function () {
    //pick the hole
    var hole = Math.floor(Math.random() * 5) + 1;

    //ad the 6 pipes
    for (var i = 0; i < 8; i++)
      if (i != hole && i != hole + 1)
        this.addOnePipe(400, i * 60 + 10);

    this.score += 1;
    this.labelScore.text = this.score;
  },

  update: function(){
    if (this.bird.inWorld == false){
      this.restartGame();

    }

    if (this.bird.angle < 20){
      this.bird.angle += 1;
    };

    game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    // game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },

  jump: function(){

    if (this.bird.alive == false)
    return;

    this.bird.body.velocity.y = -350;

    // Create an animation on the bird
    var animation = game.add.tween(this.bird);

    // Set the animation to change the angle of the sprite to -20° in 100 milliseconds
    animation.to({angle: -20}, 100);

    // And start the animation
    animation.start();
  },

  hitPipe: function() {
    // If the bird has already hit a pipe, we have nothing to do
    if (this.bird.alive == false)
        return;

    // Set the alive property of the bird to false
    this.bird.alive = false;

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEachAlive(function(p){
        p.body.velocity.x = 0;
    }, this);
},

  restartGame: function(){
    game.state.start('main');
  }
};

game.state.add('main', mainState);
game.state.start('main');
