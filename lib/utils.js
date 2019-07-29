var utils = {
  centerGameObjects: function (objects) {
    objects.forEach(function (object) {
      object.anchor.setTo(0.5);
    })
  },
  commonAssets: function (scene) {
    console.log('commonAssets');

    var configuration = game.cache.getJSON('configJson');

    this.productsInCartGroup = game.add.group();

    //Background
    this.background = game.add.sprite(0, 50, 'ui_welcomescreen');
    this.background.frame = 5;
    this.background.x = 0;
    this.background.y = 0;

    //Store
    this.store = game.add.sprite(0, 50, 'ui_welcomescreen');
    this.store.frame = 9;
    this.store.x = 250;
    this.store.y = 165;

    //Cash Register
    this.cashRegister = game.add.sprite(0, 50, 'ui_welcomescreen');
    this.cashRegister.frame = 0;
    this.cashRegister.x = 350;
    this.cashRegister.y = 0;


    //VAD Logo 
    this.vadLogo = game.add.sprite(25, 0, 'ui_welcomescreen');
    this.vadLogo.frame = 10;

    //Company Logo 
    this.companyLogo = game.add.sprite(50, 225, 'logo');

    //Pole
    this.pole = game.add.sprite(0, 50, 'ui_welcomescreen');
    this.pole.frame = 6;
    this.pole.x = 870;
    this.pole.y = 0;

    //Skip Button
    this.skipButton = game.add.button(810, 0, "ui_welcomescreen", this.skipGame, this);
    this.skipButton.frame = 7;
    this.skipButton.x = 820;
    this.skipButton.y = 0;
    this.skipButton.inputEnabled = false;

    //This is to scroll the store from left to right, first we add a group, the actual movement is in the update function 
    this.scrollingStoreGroup = game.add.group();

    //	A mask is a Graphics object is then created
    var storeMask = game.add.graphics(0, 0);

    // Then create the polygon shape of the mask 
    var storePoly = new Phaser.Polygon([new Phaser.Point(275, 257),
      new Phaser.Point(900, 257), new Phaser.Point(900, 435), new Phaser.Point(910, 630),
      new Phaser.Point(275, 630)]);

    //	Shapes drawn to the Graphics object must be filled.
    storeMask.beginFill(0xffffff);

    // Draw the poly mask 
    storeMask.drawPolygon(storePoly.points);

    //Add the store background to the group 	
    var scrollingBg1 = game.add.sprite(0, 250, 'shelf01');

    //Glass Mask for fridge
    var scrollingBg4 = game.add.sprite(scrollingBg1.width, 250, 'shelf04');

    var scrollingBg2 = game.add.sprite(scrollingBg4.x + scrollingBg4.width, 250, 'shelf02');

    console.log("scrollingBg4", scrollingBg4.x);

    var scrollingBg3 = game.add.sprite(scrollingBg2.x + scrollingBg2.width, 250, 'shelf03');

    this.scrollingStoreGroup.add(scrollingBg1);
    this.scrollingStoreGroup.add(scrollingBg4);
    this.scrollingStoreGroup.add(scrollingBg2);
    this.scrollingStoreGroup.add(scrollingBg3);

    var fridgeLeftPane = game.add.graphics(scrollingBg2.x + 15, scrollingBg2.y + 18);
    var fridgeRightPane = game.add.graphics(fridgeLeftPane.x + 300, scrollingBg2.y + 18);

    drawShape(0x027a71, 0x02fdeb, 260, 325, fridgeLeftPane);
    drawShape(0x027a71, 0x02fdeb, 260, 325, fridgeRightPane);

    fridgeLeftPane.alpha = 0.5;
    fridgeRightPane.alpha = 0.5;

    this.scrollingStoreGroup.add(fridgeLeftPane);
    this.scrollingStoreGroup.add(fridgeRightPane);

    function drawShape(fill, style, w, h, g) {

      g.clear();

      g.beginFill(fill);
      g.lineStyle(1, style, 1);

      g.moveTo(0, 0);
      g.lineTo(w, 0);
      g.lineTo(w, h);
      g.lineTo(0, h);

      g.endFill();

    }

    //Apply the mask to the scrolling store background
    this.scrollingStoreGroup.mask = storeMask;

    this.poly = new Phaser.Polygon([new Phaser.Point(157, 120),
      new Phaser.Point(650, 100), new Phaser.Point(625, 430),
      new Phaser.Point(185, 420)]);

    this.polyShader = new Phaser.Polygon([new Phaser.Point(0, 0),
      new Phaser.Point(970, 0), new Phaser.Point(970, 710),
      new Phaser.Point(0, 710)]);

    //Add the player
    //Add Female character Idle image 
    this.femaleCharacterIdle = game.add.sprite(200, 300, 'ui_welcomescreen');
    this.femaleCharacterIdle.frame = 3;
    this.femaleCharacterIdle.visible = true;

    //Add Male Character Idle Image 
    this.maleCharacterIdle = game.add.sprite(200, 300, 'ui_welcomescreen');
    this.maleCharacterIdle.frame = 4;
    this.maleCharacterIdle.visible = false;

    //Add the background shader this dims the background
    this.bgShader = game.add.graphics(0, 0);
    this.bgShader.beginFill(0x000000);
    this.bgShader.drawPolygon(this.polyShader.points);
    this.bgShader.endFill();
    this.bgShader.alpha = 0.5;

    this.welcomeScreenPopup = game.add.group()

    this.welcomeScreenBg = game.add.graphics(100, 75);
    this.welcomeScreenBg.beginFill(0xffffff);
    this.welcomeScreenBg.drawPolygon(this.poly.points);
    this.welcomeScreenBg.endFill();

    //Welcome Screen 		
    this.welcomeScreen = game.add.sprite(0, 50, 'ui_welcomescreen');
    this.welcomeScreen.frame = 11;
    this.welcomeScreen.x = 250;
    this.welcomeScreen.y = 164;


    var style2 = { font: '11pt Arial', fill: 'black', align: 'center', fontWeight: 500, wordWrap: true, wordWrapWidth: 430 };
    var style3 = { font: '13pt Arial', fill: 'black', align: 'center', fontWeight: 600, wordWrap: true, wordWrapWidth: 450 };
    var text2 = game.add.text(295, 250, configuration.welcome_text_popup, style2);
    var text3 = game.add.text(300, 205, configuration.welcome_text_popup_title, style3);

    this.welcomeScreenPopup.add(this.welcomeScreenBg);
    this.welcomeScreenPopup.add(this.welcomeScreen);

    this.welcomeScreenPopup.add(text2);
    this.welcomeScreenPopup.add(text3);
    this.welcomeScreenPopup.x = 0;
    this.welcomeScreenPopup.y = 0;


    var style = { font: '14pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 200 };
    var text = game.add.text(25, 400, configuration.welcome_text, style);
    text.anchor.set(0);

  },
  checkOut: function () {
    console.log('Checkout');
  },
  skipGame: function () { },
  tweenTo: function (object, params, action, tweenSpeed) {
    var motion = Phaser.Easing.Bounce.Out;
    switch (action) {
      case "bounceIn":
        motion = Phaser.Easing.Bounce.In
        break;
      case "bounceOut":
        motion = Phaser.Easing.Bounce.Out
        break;
      case "bounce":
        motion = Phaser.Easing.Bounce.InOut
        break;
      case "linear":
        motion = Phaser.Easing.Linear.InOut
        break;
      default:
        break;
    }

    this.myTween = game.add.tween(object);
    this.myTween.to(params, tweenSpeed, motion);
    this.myTween.start();
    return this.myTween;
  },
  textStyle: function (font, fill, align, fontWeight, stroke, strokeThickness) {
    var style = {
      font: font,
      fill: fill,
      align: align,
      fontWeight: fontWeight,
      stroke: stroke,
      strokeThickness: strokeThickness
    }
    return style;

  },
  returnJson: function (str) {
    return game.cache.getJSON(str);
  },
  headingText: function (headingsArray, tabsArray) {
    var style = { font: "18px Courier", fill: "#fff", tabs: tabsArray };
    var headings = headingsArray;
    var headerText = game.add.text(32, 64, '', style);
    headerText.parseList(headings);
    return headerText;
  },
  drawShape(fill, style, w, h, g) {

    g.clear();

    g.beginFill(fill);
    g.lineStyle(1, style, 1);

    g.moveTo(0, 0);
    g.lineTo(w, 0);
    g.lineTo(w, h);
    g.lineTo(0, h);

    g.endFill();

    return g;

  },
  drawRoundedRect: function (g, xCoord, yCoord, width, height, fill, lineStyle, lineWidth, radius) {

    g.clear();

    g.beginFill(fill || 0xffffff);
    g.lineStyle(lineWidth || 2, lineStyle || 0xffffff, lineWidth || 2);
    g.drawRoundedRect(xCoord || 0, yCoord || 0, width || 100, height || 100, radius || 10);

    return g;

  },
  doubleclick: function () {
    var doubleBoolean = false;
    var now = new Date().getTime();
    var timesince = now - this.myLastestTap;
    if ((timesince < 600) && (timesince > 0)) {
      doubleBoolean = true;
      console.log("doubleclick");
    }
    this.myLastestTap = new Date().getTime();

    return doubleBoolean;
  }
};
