var GameMenu = function() {};


GameMenu.prototype = {

  menuConfig: {
    startY: 260,
    startX: 30
  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 100, "Lunch Break", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);
    this.optionCount = 1;
  },

  create: function () {

    if (music.name !== "love" && playMusic) {
      music.pause();
      music = game.add.audio('love');
      music.loop = true;
      music.play();
    }
    game.stage.disableVisibilityChange = true;
    game.add.sprite(0, 0, 'menu-bg');
    game.add.sprite(0, 0, 'ui_welcomescreen').frame = 5;
		
    game.add.sprite(0,0,'logo');
    
    var MenuScene = new utils.commonAssets("Game");
    
    game.add.existing(this.titleText);

    this.addMenuOption('Start', function () {
      game.state.start("Game");
    });
    /*
    this.addMenuOption('Options', function () {
      game.state.start("Options");
    });
    this.addMenuOption('Credits', function () {
      game.state.start("Credits");
    });

this.addMenuOption('Sophek', function () {
      game.state.start("Sophek");
    });
    */

  }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
