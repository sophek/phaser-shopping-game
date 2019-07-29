var Splash = function () { };

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('Health', 'vendor/HealthBar.standalone.js');
    game.load.script('gamemenu', 'states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover', 'states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('options', 'states/Options.js');
    game.load.script('sophek', 'states/Sophek.js');
    
  },
  loadJson: function () {

    //Products Json
    game.load.json('products', 'assets/json/products.json');

    //Config Json 
    game.load.json('configJson', 'assets/json/configJson.json');

    //Gwen Walk Json 
    game.load.atlasJSONHash('Female', 'assets/sprites/gwen.png', 'assets/json/gwen.json');

    //Tyrone Walk Json 
    game.load.atlasJSONHash('Male', 'assets/sprites/tyrone.png', 'assets/json/tyrone.json');

    //Shopping Cart Json 
    game.load.atlasJSONHash('cart', 'assets/sprites/cart.png', 'assets/json/cart.json');

    //Checkout Screen Json 
    game.load.atlasJSONHash('ui_checkoutscreen', 'assets/sprites/ui_checkoutscreen.png', 'assets/json/ui_checkoutscreen.json');

    //Welcome Screen Json 
    game.load.atlasJSONHash('ui_welcomescreen', 'assets/sprites/ui_welcomescreen.png', 'assets/json/ui_welcomescreen.json');

    //Products Pngs Json
    game.load.atlasJSONHash('productsPng', 'assets/sprites/productsPng.png', 'assets/json/productsPng.json');

  },
  loadSfx: function () {
    game.load.audio("select", ["assets/sfx/select.mp3", "assets/sfx/select.ogg"]);
    game.load.audio("right", ["assets/sfx/right.mp3", "assets/sfx/right.ogg"]);
    game.load.audio("wrong", ["assets/sfx/wrong.mp3", "assets/sfx/wrong.ogg"]);
    game.load.audio("chaching", ["assets/sfx/chaching.mp3"]);
    game.load.audio("swoosh", ["assets/sfx/Swooshing.mp3"]);
  },
  loadVO: function () {
    game.load.audio('lunchbreaksound', ['assets/vo/Lunchbreak.mp3']);

  },

  loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    game.load.audio('dangerous', 'assets/bgm/Dangerous.mp3');
    game.load.audio('exit', 'assets/bgm/Exit the Premises.mp3');
    game.load.audio('love', ['assets/bgm/Love.mp3']);

  },
  // varios freebies found from google image search
  loadImages: function () {
    game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    game.load.image('options-bg', 'assets/images/options-bg.jpg');
    game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
    
    game.load.image('popupimg', 'assets/images/productPopup.png');
    game.load.image('scrollbg', 'assets/images/shelves.png');

    //Logo 
    game.load.image('logo', 'assets/images/photo-19928.png');

    //Shelves
    game.load.image('shelf01', 'assets/images/shelf01.png');
    game.load.image('shelf02', 'assets/images/shelf02.png');
    game.load.image('shelf03', 'assets/images/shelf03.png');
    game.load.image('shelf04', 'assets/images/shelf04.png');

    game.load.image('ground', 'assets/images/ground.png');

  },
  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  init: function () {
    this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
    this.logo = game.make.sprite(game.world.centerX, 200, 'brand');
    this.status = game.make.text(game.world.centerX, 380, 'Loading...', { fill: 'white' });
    utils.centerGameObjects([this.logo, this.status]);
  },

  preload: function () {
    
    game.add.sprite(0, 0, 'stars');
    game.add.existing(this.logo).scale.setTo(0.5);
    game.add.existing(this.loadingBar);
    game.add.existing(this.status);
    
    this.load.setPreloadSprite(this.loadingBar);
    this.loadJson();
    this.loadScripts();
    this.loadImages();
    this.loadFonts();
    this.loadBgm();
    this.loadVO();
    this.loadSfx();
  },

  addGameStates: function () {

    game.state.add("GameMenu", GameMenu);
    game.state.add("Game", Game);
    game.state.add("GameOver", GameOver);
    game.state.add("Credits", Credits);
    game.state.add("Options", Options);
    game.state.add("Sophek", Sophek);
    
  },

  addGameMusic: function () {
    music = game.add.audio('love');
    music.loop = true;
    music.play();
  },

  create: function () {
    this.status.setText('Ready!');
    this.addGameStates();
    this.addGameMusic();

    setTimeout(function () {
      game.state.start("GameMenu");
    }, 1000);
  }
};
