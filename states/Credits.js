var Credits = function (game) { };

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  addCredit: function (task, author) {
    var authorStyle = { font: '40pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
    var taskStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', strokeThickness: 4 };
    var authorText = game.add.text(game.world.centerX, 900, author, authorStyle);
    var taskText = game.add.text(game.world.centerX, 950, task, taskStyle);
    authorText.anchor.setTo(0.5);
    authorText.stroke = "rgba(0,0,0,0)";
    authorText.strokeThickness = 4;
    taskText.anchor.setTo(0.5);
    taskText.stroke = "rgba(0,0,0,0)";
    taskText.strokeThickness = 4;
    game.add.tween(authorText).to({ y: -300 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    game.add.tween(taskText).to({ y: -200 }, 20000, Phaser.Easing.Cubic.Out, true, this.creditCount * 10000);
    this.creditCount++;
  },

  addMenuOption: function (text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
    var txt = game.add.text(10, (this.optionCount * 80) + 450, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount++;
  },

  create: function () {

    //physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 250;
    this.game.world.setBounds(0, 0, 3500, this.game.height);



    this.stage.disableVisibilityChange = true;
    if (gameOptions.playMusic) {
      //musicPlayer.pause();
      //musicPlayer = game.add.audio('exit');
      //musicPlayer.play();
    }
    this.ground = this.add.tileSprite(0, this.game.height - 100, this.game.world.width, 70, 'ground');


    this.femaleCharacter = game.add.sprite(400, 250, 'Female');
    this.femaleCharacter.animations.add('walk');
    this.femaleCharacter.animations.play('walk', 40, true);
    this.femaleCharacter.visible = true;
    game.physics.enable(this.femaleCharacter, Phaser.Physics.ARCADE);

    this.femaleCharacter.body.bounce.y = 0.2;
    this.femaleCharacter.body.collideWorldBounds = true;
    this.femaleCharacter.body.setSize(20, 32, 5, 16);


    
    var bg = game.add.sprite(0, 0, 'gameover-bg');

    //this.addCredit('Music', 'Kevin Macleod');
    //this.addCredit('Developer', 'Matt McFarland');
    //this.addCredit('Lorem Ipsum', 'Mipsem Dempsum');
    //this.addCredit('Caveats', 'Keyboard Cat');
    //this.addCredit('Phaser.io', 'Powered By');
    //this.addCredit('for playing', 'Thank you');
    this.addMenuOption('<- Back', function (e) {
      game.state.start("GameMenu");
    });
    //game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
  }

};
