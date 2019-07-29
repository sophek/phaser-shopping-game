var Game = function (game) { };


function foobar (){
    console.log('foobar');
  }

Game.prototype = {

  GameConfig: {
    bitFont: null,
    cashLeft: 0,
    characterX: 200,
    characterY: 300,
    currentTotal: 0,
    currentPrice: 0,
    pointsArray: {
      'x': [32, 128, 256, 384, 512, 608],
      'y': [240, 240, 240, 240, 240, 240]
    },
    productsInCartCounter: 0,
    shoppingCartX: 0,
    speed: 0.5,
    textX: 500,
    recieptX: 725,
    totalAmount: 0,
    totalRetailAmount: 0,
    totalSavedAmount: 0,
    totalSavedPercentAmount: 0,
    totalAuxAmount: 0,
    totalQty: 0,
    checkoutScreenSprite: null,
    grainsArray: [],
    veggiesArray: [],
    fruitArray: [],
    proteinArray: [],
    dairyArray: [],
    shelf1: null,
    shelf2: null,
    shelf3: null,
    shelf4: null,
    characterBoolean: true,
    cartArray: [],
    badge: null,
    myLastestTap: null,
    receiptPopupGroup: null,
    showReceiptBoolean: false,
    topBarText: [],
    productName: null,
    productPrice: null,
    productRetailPrice: null,
    receiptTable: null,
    receiptTableHeaders: null
  },
  preload: function () {
    this.optionCount = 1;
  },
  addHeadingText: function (text, callback) {
    var optionStyle = { font: "16px Courier", fill: "#fff", tabs: [164, 120, 80] };
    var txt = game.add.text(game.world.centerX, 400, text, optionStyle);
  },
  addMenuOption: function (text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
    txt.anchor.setTo(0.5);
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
  barConfig: function (x, y, w, h) {

    var barConfigValues = {
      width: w, height: h, x: x, y: y, bg: {
        color: '#ffffff'
      }, bar: {
        color: '#f44336'
      }
    };
    return barConfigValues;
  },
  showHealthbars: function () {

    // Grains HealthBar
    this.grainsHealthBar = new HealthBar(this.game, this.barConfig(392, 224, 70, 13));
    this.grainsHealthBar.setPercent(0);

    //Veggies HealthBar
    this.veggiesHealthBar = new HealthBar(this.game, this.barConfig(489, 224, 70, 13));
    this.veggiesHealthBar.setPercent(0);

    //Fruit HealthBar
    this.fruitHealthBar = new HealthBar(this.game, this.barConfig(584, 225, 70, 13));
    this.fruitHealthBar.setPercent(0);

    //Protein HealthBar
    this.proteinHealthBar = new HealthBar(this.game, this.barConfig(680, 225, 70, 13));
    this.proteinHealthBar.setPercent(0);

    //Dairy HealthBar
    this.dairyHealthBar = new HealthBar(this.game, this.barConfig(777, 224, 70, 13));
    this.dairyHealthBar.setPercent(0);

  },
  showHealthbarsCheckout: function (barX, barY, barSpacing) {
    var firstY = barY;
    var barSpacing = barSpacing;
    this.dairyHealthBarCheckout = new HealthBar(this.game, this.barConfig(barX, firstY, 73, 19));
    this.grainsHealthBarCheckout = new HealthBar(this.game, this.barConfig(barX, firstY + barSpacing * 1, 73, 19));
    this.fruitHealthBarCheckout = new HealthBar(this.game, this.barConfig(barX, firstY + barSpacing * 2, 73, 19));
    this.veggiesHealthBarCheckout = new HealthBar(this.game, this.barConfig(barX, firstY + barSpacing * 3, 73, 19));
    this.proteinHealthBarCheckout = new HealthBar(this.game, this.barConfig(barX, firstY + barSpacing * 4, 73, 19));

  },
  create: function () {



    //  Enable p2 physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 500;
    game.physics.p2.restitution = 1.0;
    this.game.world.setBounds(0, 0, 3500, this.game.height - 125);

    //Add the product json data	
    this.productJSON = game.cache.getJSON('products');
    this.configuration = utils.returnJson('configJson')

    this.stage.disableVisibilityChange = false;
    this.GameScene = new utils.commonAssets("Game");

    this.showHealthbars();

    //Text Styles 
    this.changeShopperStyle = utils.textStyle("16px Verdana", "#ffcc33", "center", "400", "#ffffff", 0);
    this.moneyStyle = utils.textStyle("30px Verdana", "#FF0000", "center", 600, "#000000", 1);
    this.grayStyle = utils.textStyle("18px Verdana", "#999999", "left", 300, "#000000", 0);
    this.blackStyle = utils.textStyle("24px Verdana", "#000000", "left", 400, "#000000", 0);
    this.paragraphTitleStyle = utils.textStyle("24px Verdana", "#000000", "center", 800, "#000000", 0);
    this.productStyle = utils.textStyle("15px Verdana", "#FF0000", "left", 700, 0, 0);
    this.paragraphStyle = {
      font: "17px Verdana",
      fill: "#000000",
      align: "center",
      fontWeight: 800,
      wordWrap: true,
      wordWrapWidth: 750
    }

    this.productsInCartGroup = game.add.group();
    //this.productsInCartGroup = game.add.physicsGroup(Phaser.Physics.P2JS);
    this.productsGroup = game.add.group();


    //Move the welcome propop screen move up and out of the way
    utils.tweenTo(this.GameScene.welcomeScreenPopup, { y: -1000 }, "linear", 1500);

    //Faded the background shader 
    utils.tweenTo(this.GameScene.bgShader, { alpha: 0 }, "linear", 1000);

    //shoppingCart 
    this.shoppingCart = game.add.sprite(215, 312, 'cart');
    this.shoppingCart.scale.setTo(0.95, 0.95);

    //Animate the shopping cart 
    this.shoppingCart.animations.add('walk');
    this.shoppingCart.animations.play('walk', 40, true);
    this.shoppingCart.scale.setTo(0.95, 0.95);

    //Create the Cart Mask, the mask will make sure the items does not protrude out of the shopping cart 
    var cartMask = game.add.graphics(0, 0);


    //	Shapes drawn to the Graphics object must be filled.
    cartMask.beginFill(0xffffff);
    cartMask.alpha = 0.5;

    // This is the polygon points to make the mask shape 
    cartPloy = new Phaser.Polygon([new Phaser.Point(0, 250),
      new Phaser.Point(900, 250),
      new Phaser.Point(905, 630),
      new Phaser.Point(555, 630),
      new Phaser.Point(555, 595),
      new Phaser.Point(425, 605),
      new Phaser.Point(395, 475),
      new Phaser.Point(275, 450),
      new Phaser.Point(275, 250)]);

    // Draw the mask shape with these points 		
    cartMask.drawPolygon(cartPloy.points);

    //Apply the mask to the shopping cart  
    this.productsInCartGroup.mask = cartMask;

    this.GameScene.femaleCharacterIdle.visible = !this.GameScene.femaleCharacterIdle.visible;

    //Female Character 
    this.femaleCharacter = game.add.sprite(this.GameConfig.characterX, this.GameConfig.characterY, 'Female');
    this.femaleCharacter.animations.add('walk');
    this.femaleCharacter.animations.play('walk', 40, true);
    this.femaleCharacter.visible = true;

    //Add Male Character Idle Image 
    this.maleCharacterIdle = game.add.sprite(this.GameConfig.characterX, 300, 'ui_welcomescreen');
    this.maleCharacterIdle.frame = 4;
    this.maleCharacterIdle.visible = false;

    //Male Character set to visible is false, will toogle visiblity later 
    this.maleCharacter = game.add.sprite(this.GameConfig.characterX, 305, 'Male');
    this.maleCharacter.animations.add('walk');
    this.maleCharacter.animations.play('walk', 40, true);
    this.maleCharacter.visible = false;

    //Place Products
    this.placeProducts();

    //Checkout Button 
    //this.checkoutButton = game.add.button(810, 0, "ui_welcomescreen", this.switchShopper, this);
    this.checkoutButton = game.add.button(810, 0, "ui_welcomescreen", this.checkOut, this);

    this.checkoutButton.frame = 1;
    this.checkoutButton.x = 820;
    this.checkoutButton.y = 86;
    this.checkoutButton.inputEnabled = true;

    //Checkout Screen BG 
    this.GameConfig.checkoutScreenSprite = game.add.sprite(0, 50, 'ui_checkoutscreen');
    this.GameConfig.checkoutScreenSprite.frame = 2;
    this.GameConfig.checkoutScreenSprite.x = 75;
    this.GameConfig.checkoutScreenSprite.alpha = 0.75;

    //Shopping List  
    this.ui_checkoutscreen_shoppinglist = game.add.sprite(0, 200, 'ui_checkoutscreen');
    this.ui_checkoutscreen_shoppinglist.frame = 5;
    this.ui_checkoutscreen_shoppinglist.x = 225;
    this.ui_checkoutscreen_shoppinglist.y = 225;
    this.ui_checkoutscreen_shoppinglist.alpha = 1;
    
    //Checkout Button   
    this.ui_checkoutscreen_checkoutBtn = game.add.button(0, 200, 'ui_checkoutscreen',this.checkOutStripe,this);
    this.ui_checkoutscreen_checkoutBtn.frame = 0;
    this.ui_checkoutscreen_checkoutBtn.x = 600;
    this.ui_checkoutscreen_checkoutBtn.y = 555;

    //this.ui_checkoutscreen_checkoutBtn.onInputDown.add(this.stripeCheckout,this);

    //Checkout Reciept
    this.ui_checkoutscreen_receipt = game.add.sprite(0, 200, 'ui_checkoutscreen');
    this.ui_checkoutscreen_receipt.frame = 4;
    this.ui_checkoutscreen_receipt.x = 650;

    this.donationLabelTextSprite = game.add.text(this.GameConfig.recieptX, 275, this.configuration.receipt_group_label, this.grayStyle);
    this.totalAmountTextSprite = game.add.text(this.GameConfig.recieptX, 300, "0.00", this.moneyStyle);

    this.retailTotalLabelTextSprite = game.add.text(this.GameConfig.recieptX, 350, this.configuration.receipt_group_label1, this.grayStyle);
    this.totalRetailTextSprite = game.add.text(this.GameConfig.recieptX, 368, "0.00", this.moneyStyle);

    this.savedTotalLabelTextSprite = game.add.text(this.GameConfig.recieptX, 425, this.configuration.receipt_group_label2, this.grayStyle);
    this.totalSavedTextSprite = game.add.text(this.GameConfig.recieptX, 445, "0.00", this.moneyStyle);

    this.percentSavedLabelTextSprite = game.add.text(this.GameConfig.recieptX, 500, this.configuration.receipt_group_label3, this.grayStyle);
    this.totalSavedPercentSprite = game.add.text(this.GameConfig.recieptX, 525, "0.00", this.moneyStyle);


    this.checkOutGroup = game.add.group();
    this.checkOutGroup.add(this.GameConfig.checkoutScreenSprite);
    this.checkOutGroup.add(this.ui_checkoutscreen_receipt);
    this.checkOutGroup.add(this.ui_checkoutscreen_shoppinglist);
    this.checkOutGroup.add(this.ui_checkoutscreen_checkoutBtn);

    //Show HealthBar Checkout
    this.showHealthbarsCheckout(2000, 300, 50);

    this.checkOutGroup.add(this.totalAmountTextSprite);
    this.checkOutGroup.add(this.donationLabelTextSprite);
    this.checkOutGroup.add(this.retailTotalLabelTextSprite);
    this.checkOutGroup.add(this.totalRetailTextSprite);
    this.checkOutGroup.add(this.savedTotalLabelTextSprite);
    this.checkOutGroup.add(this.totalSavedTextSprite);
    this.checkOutGroup.add(this.percentSavedLabelTextSprite);
    this.checkOutGroup.add(this.totalSavedPercentSprite);
    this.checkOutGroup.visible = false;

    this.recieptPopup();

    //var headings = utils.headingText(['Qty', 'Product', 'Price']);

    this.GameConfig.badge = this.badge("16pt Arial", "white", "X", 30, 30, 0xd22e2e, 0xffffff, this.doubleclick, { functionName: "emptyCart", fontX: game.width / 2 - 60, fontY: game.height / 2 + 260, badgeX: game.width / 2 - 60, badgeY: game.height / 2 + 225 });
    this.showReceiptButton = this.badge("20pt Arial", "white", this.GameConfig.totalQty, 40, 40, 0xd22e2e, 0xffffff, this.doubleclick, { functionName: "showReceipt", fontX: game.width / 2 + 75, fontY: game.height / 2 + 145, badgeX: game.width / 2 + 75, badgeY: game.height / 2 + 100 });
    this.productPopUp();
    this.cashDigitals();
    this.roundedRectangle(250);

    this.juicy = this.game.plugins.add(new Phaser.Plugin.Juicy(this));

    //load Sfx

    this.placeShelf();

    this.loadSfx(true);


  },

  placeProductInAir: function (){
    console.log("add product",this.game.rnd.integerInRange(0,100));
  },

  roundedRectangle: function (rectWidth) {
    this.roundedRectangleGroup = game.add.group();
    this.graphicsRect = game.add.graphics(0, 0);
    var style = { font: '12pt Arial', fill: 'White', align: 'left' };

    this.roundedText = game.add.text(game.width / 2 + 5, game.height / 2 + 230, "", style);
    this.roundedText.anchor.x = 0;
    // set a fill and line style
    this.graphicsRect.beginFill(0xd22e2e);
    this.graphicsRect.lineStyle(2, 0xffffff, 2);
    this.graphicsRect.drawRoundedRect(game.width / 2 - 25, game.height / 2 + 220, rectWidth, 40, 10);

    //window.graphics = graphics;
    this.roundedRectangleGroup.add(this.graphicsRect);
    this.roundedRectangleGroup.add(this.roundedText);
    this.roundedRectangleGroup.alpha = 0;

  },

  cashDigitals: function () {
   // var bitFontStyle = { font: 'bold 60pt TheMinion', fill: 'black', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4 };
    var bitFontStyle = { font: 'bold 60pt Arial', fill: '#39d179', align: 'left', stroke: '#ffffff', srokeThickness: 15 };
   
    this.GameConfig.bitFont = game.add.text(750, 20, "0.00", bitFontStyle);
    this.GameConfig.bitFont.anchor.x = 1;
    this.GameConfig.bitFont.stroke = "rgba(0,0,0,0";
    this.GameConfig.bitFont.strokeThickness = 4;
    this.GameConfig.bitFont.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

  },

  showReceipt: function (target) {
    var fade;
    var sBoolean = this.GameConfig.showReceiptBoolean = !this.GameConfig.showReceiptBoolean;

    if (sBoolean) {
      this.GameConfig.receiptPopupGroup.visible = sBoolean;
      fade = utils.tweenTo(this.GameConfig.receiptPopupGroup, { alpha: 1 }, "linear", 500);
      this.badgeText.setText("X");
      utils.tweenTo(this.showReceiptButton, { x: -125 }, "linear", 500);

    } else {
      fade = utils.tweenTo(this.GameConfig.receiptPopupGroup, { alpha: 0 }, "linear", 500);
      this.badgeText.setText(this.GameConfig.totalQty);
      utils.tweenTo(this.showReceiptButton, { x: 0 }, "linear", 500);

    }
  },
  doubleclick: function (myfunc, def, params) {
    var now = new Date().getTime();
    var timesince = now - this.GameConfig.myLastestTap;
    if ((timesince < 600) && (timesince > 0)) {
      if (params.functionName === "emptyCart")
        this.emptyCart();
    } else if (params.functionName === "showReceipt") {
      this.showReceipt();
    }
    this.GameConfig.myLastestTap = new Date().getTime();
  },
  emptyCart: function () {

    //Empty The recipt Text;

    //Empty the array and recieptTable content string 
    this.GameConfig.cartArray = [];
    this.GameConfig.receiptTable.setText("");

    this.juicy.shake();

    // Fade out all the items in the cart  
    this.productsInCartGroup.forEach(function (item) {
      //var productTween = game.add.tween(item).to({ alpha: 0 }, 1000, Phaser.Easing.Bounce.InOut, true);
      var productTween = utils.tweenTo(item, { alpha: 0 }, "bounceInOut", 1000);

    }, this);


    //Destory all the items in the cart 
    this.productsInCartGroup.forEach(function (item) {
      item.destroy();
    }, this);

    // Set the products in cart back to 0
    this.GameConfig.productsInCartCounter = 0;

    // Set all the text amount to 0
    this.GameConfig.totalAmount = 0;
    this.GameConfig.totalRetailAmount = 0;
    this.GameConfig.totalSavedAmount = 0;
    this.GameConfig.totalSavedPercentAmount = 0;
    this.GameConfig.totalAuxAmount = 0;
    this.GameConfig.totalQty = 0;
    this.GameConfig.bitFont.setText(0.00);
    this.badgeText.setText(this.GameConfig.totalQty);

    // Health arrays back to null 
    this.GameConfig.grainsArray = [];
    this.GameConfig.fruitArray = [];
    this.GameConfig.proteinArray = [];
    this.GameConfig.veggiesArray = [];
    this.GameConfig.dairyArray = [];
    //

    // Set the health bars back to 0 
    this.veggiesHealthBar.setPercent(0);
    this.fruitHealthBar.setPercent(0);
    this.grainsHealthBar.setPercent(0);
    this.proteinHealthBar.setPercent(0);
    this.dairyHealthBar.setPercent(0);

    console.log("this.GameConfig.cartArray", this.GameConfig.cartArray);

    this.GameConfig.cartArray = [];

    console.log("this.GameConfig.cartArray", this.GameConfig.cartArray);


  },
  topbar: function () {

    this.topbarGroup = game.add.group();

    this.topbarSprite = game.add.graphics(0, 0);
    //Draw the invisible Button 
    this.tBar = utils.drawShape(0x027a71, 0x02fdeb, game.width, 50, this.topbarSprite);

    this.totalAmountTextTopBar = game.add.text(50, 50, "0.00", this.moneyStyle);

    this.totalAmountTextTopBar.y = 20;
    this.topbarGroup.add(this.tBar);

    this.topbarGroup.add(this.totalAmountTextTopBar);
    this.topbarGroup.y = -50;

  },
  recieptPopup: function () {
    this.recieptBg = game.add.graphics(525, 115);
    //Draw the invisible Button 
    //utils.drawShape(0x027a71, 0x02fdeb, 375, 375, this.recieptBg);
    utils.drawRoundedRect(this.recieptBg, -100, 0, 500, 400, 0xd22e2e, 0xffffff, 2, 10);

    this.GameConfig.receiptPopupGroup = game.add.group();
    this.GameConfig.receiptPopupGroup.add(this.recieptBg);

    //the Reciept popup headers
    var headings = ['SKU', 'Product', 'Qty', 'Price'];
    this.GameConfig.receiptTableHeaders = utils.headingText(headings, [50, 300, 50, 50]);
    this.GameConfig.receiptTableHeaders.x = 450;
    this.GameConfig.receiptTableHeaders.y = 125;

    //the reciept popup content
    this.GameConfig.receiptTable = utils.headingText([], [50, 300, 50, 50]);
    this.GameConfig.receiptTable.x = 450;
    this.GameConfig.receiptTable.y = 150;

    //Add to the receiptPopupGroup
    this.GameConfig.receiptPopupGroup.add(this.GameConfig.receiptTableHeaders);
    this.GameConfig.receiptPopupGroup.add(this.GameConfig.receiptTable);

    this.GameConfig.receiptPopupGroup.visible = false;
    this.GameConfig.receiptPopupGroup.alpha = 0;

  },
  badge: function (fontstyle, fillColor, str, badgeW, badgeH, badgeBgColor, strokeColor, func, params) {

    var badgeGroup = game.add.group();
    var graphics = game.add.graphics(params.badgeX, params.badgeY);

    graphics.lineStyle(2, strokeColor, 1);
    graphics.beginFill(badgeBgColor, 1);
    graphics.drawCircle(0, badgeW, badgeW);
    graphics.endFill();

    graphics.inputEnabled = true;
    graphics.input.useHandCursor = true;
    graphics.events.onInputDown.add(func, this, 0, params);

    var style = { font: fontstyle, fill: fillColor, align: 'center', fontWeight: 600 };
    this.badgeText = game.add.text(params.fontX, params.fontY, str, style);
    this.badgeText.anchor.set(0.5);
    badgeGroup.add(graphics);
    badgeGroup.add(this.badgeText);

    return badgeGroup;

  },


  placeShelf: function () {

    var shelf;
    var numShelves = this.game.rnd.integerInRange(0, 3)
    console.log("shelf", numShelves)

  },

  placeProducts: function () {

    var shelf3X = 10;
    var shelf4X = 10;
    var shelf2X = 10;
    var shelf1X = 0;

    var shelf1XCounter = 0;

    this.GameConfig.shelf1 = game.add.group();
    this.GameConfig.shelf2 = game.add.group();
    this.GameConfig.shelf3 = game.add.group();
    this.GameConfig.shelf4 = game.add.group();
    this.GameConfig.shelf5 = game.add.group();


    for (var j = 0; j < this.productJSON.length - 1; j++) {

      // Set the item product from the json file 
      var myProduct = this.productJSON[j];

      var shelf = myProduct.shelf;

      // Set the product X and y coordinates and assign the function showproduct as the default click event 
      var product = game.add.button(myProduct.x, myProduct.y, "productsPng", this.showProduct, this);

      product.shelf = shelf;
      product.name = myProduct.product;

      //Set the mouseover and mouseout for each product, mouseover will fade in the item product info box and mouseout will make it dissappear					
      product.onInputOver.add(this.overProduct, this);
      product.onInputOut.add(this.outProduct, this);

      // Assing the frame to each product, this is what allows the image to show up from the spritsheet.
      product.frame = j;

      // Make some product a little bit smaller, this could from an array or from the json file itself
      if (product.shelf === 1) {

      }
      // .value or .whatever will be assignable attritubes to a product, it can be anything. ie. .description
      product.value = j;

      switch (shelf) {
        case 1:
          this.GameConfig.shelf1.add(product);
          this.GameConfig.shelf1.alpha = 0.5;
          break;
        case 2:
          product.x = shelf2X * (j * shelf);
          product.y = 300;
          this.GameConfig.shelf2.add(product);
          break;
        case 3:
          product.x = shelf3X * (j * shelf);
          product.y = 400;
          this.GameConfig.shelf3.add(product);
          break;
        case 4:
          product.x = shelf4X * (j * shelf);
          product.y = 500;
          this.GameConfig.shelf4.add(product);
          break;
        case 5:
          product.x = shelf5X * (j * shelf);
          product.y = 550;
          this.GameConfig.shelf5.add(product);
          break;

        default:
          break;
      }

      //Add the product tot he products group. and also add it to the scrollingStoreGroup 
      this.productsGroup.add(this.GameConfig.shelf1);
      this.productsGroup.add(this.GameConfig.shelf2);
      this.productsGroup.add(this.GameConfig.shelf3);
      this.productsGroup.add(this.GameConfig.shelf4);
      this.GameScene.scrollingStoreGroup.add(this.productsGroup);
    }
		},

  checkForItem: function (id, items) {
    var i = 0;
    var len = items.length;
    for (i = 0; i < len; i++) {
      if (id === items[i].id) {
        return i;
      }
    }
    return -1;
  },
  updateReceipt: function (cart, qty) {

    //Get the line item details from the cart,
    var lineItem = {
      id: cart.id,
      product: cart.product + "(@ " + cart.price + ")",
      qty: 1,
      price: cart.price
    };

    // Check to see if this item being added is in the cart 
    var isInCart = this.checkForItem(cart.id, this.GameConfig.cartArray);

    //If not, add to the cart Array 
    if (isInCart === -1) {
      this.GameConfig.cartArray.push(lineItem);
    } else {
      //Update the qty of that item and price 
      this.GameConfig.cartArray[isInCart].qty++;
      this.GameConfig.cartArray[isInCart].price *= this.GameConfig.cartArray[isInCart].qty;

    }

    //This function below converts the array of objects into an array of array so we can pass to the parseList function 
    var output = this.GameConfig.cartArray.map(function (obj) {
      return Object.keys(obj).map(function (key) {
        return obj[key];
      });
    });

    //Make a tab delimited string 
    this.GameConfig.receiptTable.parseList(output);
  },

  productPopUp: function () {
    //Add a popup group to hold all the pop up data;
    this.productPopupGroup = game.add.group();
    this.productPopupGroupBg = game.add.sprite(game.world.centerX, game.world.centerY, 'popupimg');
    this.productPopupGroupBg.anchor.set(0.5);

    var productStyle = utils.textStyle("15px Verdana", "#FF0000", "left", 700, 0, 0);

    // Add the Product Popup Texts  
    this.GameConfig.productName = game.add.text(game.world.centerX - 50, game.world.centerY - 45, "Product Name", productStyle);
    this.GameConfig.productPrice = game.add.text(game.world.centerX + 5, game.world.centerY - 5, "Product Price", productStyle);
    this.GameConfig.productRetailPrice = game.add.text(game.world.centerX - 60, game.world.centerY - 5, "Product Retail", productStyle);

    this.productPopupGroup.add(this.productPopupGroupBg);
    this.productPopupGroup.add(this.GameConfig.productName);
    this.productPopupGroup.add(this.GameConfig.productPrice);
    this.productPopupGroup.add(this.GameConfig.productRetailPrice);
    this.productPopupGroup.visible = false;
    this.productPopupGroup.alpha = 0;

  },

  showProduct: function (target) {

    var ItemId = this.productJSON[target.value];

    //The addToCart 
    this.addToCart(ItemId);
    this.updateReceipt(ItemId, 1);

    game.time.events.remove(this.GameConfig.timer);

    //Add the swoosh sound effect:
    this.sfxArray[1].play();

    //Clone the product and tween it to the cart 
    //This randomize the x and y coordinates and as to mimic randomness of add products to the cart 
    var randomY = 550 - (Math.random() * 100);
    var randomX = (400 + ((Math.random() * 100)) - 15);
    var randomV = Math.random() * 100;

    var hBounds = target.getBounds().height;
    var wBounds = target.getBounds().width;
    var baseY = 605;
    var baseX = 560;
    var borderX = 575;

    //The bottom of cart is around 525, this code belows is to ensure that the products are not floating in the cart 
    //if (randomY < 520) {
    randomY = baseY - hBounds;
    //}

    //If the x coordinates is greater or equal to 455, set the X = 450;
    if (randomX + wBounds >= borderX) {
      randomX = (baseX - wBounds) - 10;
    }

    if (hBounds >= 75 && randomY >= 400) {
      randomY = Math.abs(baseY - hBounds);
    }

    //If there is 5 items in the cart, put some randomness to the x coordinates
    if (this.GameConfig.productsInCartCounter > 4) {
      randomY -= randomV;
    }


    // The product copy uses the world x and y insteand of the local x and y because the products are moving...
    //this.productCopy = this.productsInCartGroup.create(target.world.x, target.world.y, target.key, target.frame);
    //this.productCopy.body.fixedRotation = true;
    //this.productCopy.body.setCircle(16);


    this.productCopy = game.add.sprite(target.world.x, target.world.y, target.key, target.frame);


    //this.productCopy.body.fixedRotation = true;

    this.productCopy.inputEnabled = true;
    this.productCopy.input.enableDrag();

    //Swap the depth so that the products are in the cart not outside of it.
    //game.world.swap(this.shoppingCart, productCopy);


    this.productsInCartGroup.add(this.productCopy);


        //Price Floater 

    var scoreFont = "40px Arial";
 
    //Create a new label for the score
    var scoreAnimation = this.game.add.text(target.world.x, target.world.y, "+" + ItemId.price, {font: scoreFont, fill: "#39d179", stroke: "#ffffff", strokeThickness: 15}); 
    scoreAnimation.anchor.setTo(0.5, 0);
    scoreAnimation.align = 'center';

var scoreTween = this.game.add.tween(scoreAnimation).to({x:target.world.x, y: target.world.y - 150}, 600, Phaser.Easing.Linear.InOut, true);
 
    //var scoreTween = this.game.add.tween(scoreAnimation).to({x:525, y: 20}, 800, Phaser.Easing.Exponential.InOut, true);
 
/* var scoreTween = game.add.tween(scoreAnimation).to({
      x: [this.productCopy.x, randomX + 10, randomX + 20, randomX],
      y: [this.productCopy.y, this.GameConfig.pointsArray.y[1], this.GameConfig.pointsArray.y[2], randomY],
    }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 0).interpolation(function (v, k) {
      return Phaser.Math.bezierInterpolation(v, k);
    })
*/

this.cashOut();

    //When the animation finishes, destroy this score label, trigger the total score labels animation and add the score
    scoreTween.onComplete.add(function () {
      utils.tweenTo(scoreAnimation, { alpha: 0.25 }, "linear", 200).onComplete.add(function () {
        scoreAnimation.destroy();
      }, this);
    }, this);



    var tween = game.add.tween(this.productCopy).to({
      x: [this.productCopy.x, randomX + 10, randomX + 20, randomX],
      y: [this.productCopy.y, this.GameConfig.pointsArray.y[1], this.GameConfig.pointsArray.y[2], randomY],
    }, 1500, Phaser.Easing.Quadratic.InOut, true, 0, 0).interpolation(function (v, k) {
      return Phaser.Math.bezierInterpolation(v, k);
    });

    //add the chaching sound after it landed in the chart
    tween.onComplete.add(this.chaChing, this);
  },
  loadSfx: function (toggle) {
    this.sfxArray = [];
    this.sfxArray[0] = game.add.audio('chaching');
    this.sfxArray[1] = game.add.audio('swoosh');

  },
  chaChing: function (target) {

    var tween = utils.tweenTo(target, { y: target.y - 5 }, "bounceInOut", 500);
    tween.onComplete.add(this.inCart, this);
    this.sfxArray[0].play();
    this.juicy.shake(20, target.width / 100);

    //Add the drag and drag stop event to this product 
    target.events.onDragStart.add(this.onDragStart, this);
    target.events.onDragStop.add(this.onDragStop, this);
    game.time.events.add(Phaser.Timer.SECOND * 1, this.fadeToBar, this);
  },

  inCart: function (target) {
    utils.tweenTo(target, { y: target.y + 5 }, "bounce", 500);
  },

  fadeToBar: function () {
    utils.tweenTo(this.roundedRectangleGroup, { alpha: 0 }, "linear", 500);
  },
  overProduct: function (target) {

    // Get the current item clicked and load it's data from the json file 
    var item = this.productJSON[target.value];

    //Set the product name, price and retail price 
    this.GameConfig.productName.setText(item.product);
    this.GameConfig.productPrice.setText("$" + item.price);
    this.GameConfig.productRetailPrice.setText("$" + item.retail_price);

    //Get the x and y coordinates of each item and position the popup to the top right 
    this.productPopupGroup.x = target.world.x - 450;

    //This code is to move the move over to the left if the popover is to far to the right 
    if (this.productPopupGroup.x >= 400) {
      this.productPopupGroup.x = 350;
    }

    this.productPopupGroup.y = target.world.y - 400;

    //Toggle the popupGroup visiblity
    this.productPopupGroup.visible = true;

    // Fade the screen alpha from 0 to 1 
    game.add.tween(this.productPopupGroup).to({ alpha: 1 }, 1000, "Linear", true);

		},
		outProduct: function () {
    this.productPopupGroup.visible = !this.productPopupGroup.visible;
		},
  onDragStart: function (sprite, pointer) {

		},
  onDragStop: function (sprite, pointer) {

    //If the mouse is outside the shopping cart on x or y coordinates then delete from totalAmout and reduce the productsInCartCounter
    if (pointer.x >= 575 || pointer.y <= 470) {

      //  var productTween = utils.tweenTo(sprite, { alpha: 0 }, "linear", 1000);
      var dragTween = utils.tweenTo(sprite, { y: pointer.y + sprite.height }, "linear", 500)
      dragTween.onComplete.add(this.fadeOutProduct, this);

      //reduct the HealthBar, minus the qty, set the total qty  and decrease the products in cart counter 
      this.reduceHealthBars(sprite.frame);
      this.GameConfig.totalQty--;
      this.badgeText.setText(this.GameConfig.totalQty);
      this.GameConfig.productsInCartCounter--;

      //Check to for the index of the item being delete so we can delete from the array .
      var isInCart = this.checkForItem(sprite.frame + 1, this.GameConfig.cartArray);

      //If there is a match, remove from the cart array and reciept list 
      if (isInCart > -1) {
        this.GameConfig.cartArray.splice(isInCart, 1);
        //This function below converts the array of objects into an array of array so we can pass to the parseList function 
        var output = this.GameConfig.cartArray.map(function (obj) {
          return Object.keys(obj).map(function (key) {
            return obj[key];
          });
        });

        //Refresh the receipt list 
        this.GameConfig.receiptTable.parseList(output);
      }

    }
  },
  fadeOutProduct: function (target) {
    utils.tweenTo(target, { alpha: 0 }, "linear", 500);
  },
  addToCart: function (target) {

    // update all the necessary parameters ie . carttotal, amount saved etc 
    this.GameConfig.productsInCartCounter++;
    this.GameConfig.totalAmount += parseFloat(target.price);
    this.GameConfig.totalQty++;
    this.GameConfig.totalRetailAmount += parseFloat(target.retail_price);
    this.GameConfig.totalSavedAmount = this.GameConfig.totalRetailAmount - this.GameConfig.totalAmount;
    this.GameConfig.totalSavedPercentAmount = (this.GameConfig.totalSavedAmount / this.GameConfig.totalRetailAmount) * 100;
    this.GameConfig.currentTotal = this.GameConfig.totalAmount.toFixed(2) * 100;
    this.GameConfig.currentPrice = parseFloat(target.price).toFixed(2) * 100;
    
    // The badge on the shopping cart 
    this.badgeText.setText(this.GameConfig.totalQty);
    
    // this is the default width of the product bar indicator 
    var productLen = 250;
    // if the length of the product name is greater than 5 Characters make the 
    if (target.product.toString().length > 5) {
      productLen = 250;
    } else {
      productLen = 125;
    }

    // the roundedRectangle product and price box indicator
    this.roundedRectangleGroup.destroy();
    this.roundedRectangle(productLen);
    this.roundedText.setText(target.product + " : $" + parseFloat(target.price).toFixed(2));

    // fade teh roundedRectangle box indicator in 
    utils.tweenTo(this.roundedRectangleGroup, { alpha: 1 }, "linear", 500);

    //This function adds to the food group health bar 
    this.checkFoodGroup(target.product_type);

    //Update the HealthBar
    this.updateHealthBars();
    //this.updateHealthBarsCheckout();

  },
  updateHealthBars: function () {
    this.veggiesHealthBar.setPercent(this.GameConfig.veggiesArray.length * 10);
    this.grainsHealthBar.setPercent(this.GameConfig.grainsArray.length * 10);
    this.fruitHealthBar.setPercent(this.GameConfig.fruitArray.length * 10);
    this.proteinHealthBar.setPercent(this.GameConfig.proteinArray.length * 10);
    this.dairyHealthBar.setPercent(this.GameConfig.dairyArray.length * 10);
  },
  updateHealthBarsCheckout: function (barX, barY, barSpacing, barBoolean) {

    this.veggiesHealthBarCheckout.setPercent(this.GameConfig.veggiesArray.length * 10);
    this.grainsHealthBarCheckout.setPercent(this.GameConfig.grainsArray.length * 10);
    this.fruitHealthBarCheckout.setPercent(this.GameConfig.fruitArray.length * 10);
    this.proteinHealthBarCheckout.setPercent(this.GameConfig.proteinArray.length * 10);
    this.dairyHealthBarCheckout.setPercent(this.GameConfig.dairyArray.length * 10);

    if (!barBoolean) {
      barX = -1000;
    }

    this.veggiesHealthBarCheckout.setPosition(barX, barY);
    this.grainsHealthBarCheckout.setPosition(barX, barY + 1 * barSpacing);
    this.fruitHealthBarCheckout.setPosition(barX, barY + 2 * barSpacing);
    this.proteinHealthBarCheckout.setPosition(barX, barY + 3 * barSpacing);
    this.dairyHealthBarCheckout.setPosition(barX, barY + 4 * barSpacing);


  },
  reduceHealthBars: function (target) {
    //This code below decreased the health meters
    var foodGroupType = this.productJSON[target].product_type;

				switch (foodGroupType) {
      case "Grains":
        this.GameConfig.grainsArray.pop();
        break;
      case "Veggies":
        this.GameConfig.veggiesArray.pop();
        break;
      case "Fruit":
        this.GameConfig.fruitArray.pop();
        break;
      case "Protein":
        this.GameConfig.proteinArray.pop();
        break;
      case "Dairy":
        this.GameConfig.dairyArray.pop();
        break;
      default:
				}
    //Update the health meters
    this.updateHealthBars();

  },
  checkFoodGroup: function (item) {
    switch (item) {
      case "Grains":
        this.GameConfig.grainsArray.push(1);
        break;
      case "Veggies":
        this.GameConfig.veggiesArray.push(1);
        break;
      case "Fruit":
        this.GameConfig.fruitArray.push(1);
        break;
      case "Protein":
        this.GameConfig.proteinArray.push(1);
        break;
      case "Dairy":
        this.GameConfig.dairyArray.push(1);
        break;
      default:
    }
  },

checkOutStripe: function (){
  //this.stripeCheckout();
},

  checkOut: function () {

  
    //Make Checkout screen visible / non visible
    var ckBoolean = this.checkOutGroup.visible = !this.checkOutGroup.visible

    //Make the checkout healthbars move on/off screen based on the visiblility of the checkout screen 
    this.updateHealthBarsCheckout(350, 300, 40, ckBoolean);

    //Calculate all the totals 
    this.totalAmountTextSprite.setText(this.GameConfig.totalAmount.toFixed(2));
    this.totalRetailTextSprite.setText(this.GameConfig.totalRetailAmount.toFixed(2));
    this.totalSavedTextSprite.setText(this.GameConfig.totalSavedAmount.toFixed(2));
    this.totalSavedPercentSprite.setText(this.GameConfig.totalSavedPercentAmount.toFixed(2));

    //Stop walking by switching out the walking sprite with the idle sprite
    this.toggleWalking(ckBoolean);
    this.standStill(this.femaleCharacter);
    this.toggleShoppingCartStrolling(ckBoolean);
    this.stopStore(ckBoolean);
    //game.world.swap(this.shoppingCart, this.femaleCharacter);

  },
  stripeCheckout: function () {
/*

    handler.open({
      name: 'Stripe.com',
      description: '2 widgets',
      zipCode: true,
      amount: this.GameConfig.totalAmount.toFixed(2) * 100,
      token: function (token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log("mytoekn",token);

        if (token.id !== "") {
            //Make Checkout screen visible / non visible
            foobar();
        }

      }
    });
    */
  },

  cashOut: function () {
       //var thisscoreLabelTween = this.game.add.tween(this.GameConfig.bitFont.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
      //var thisscoreLabelTween = this.game.add.tween(this.GameConfig.bitFont.scale).to({ x: 1.5, y: 1.5}, 500, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 500, Phaser.Easing.Linear.In);
 
       this.GameConfig.bitFont.setText(this.GameConfig.totalAmount.toFixed(2));
       utils.tweenTo(this.GameConfig.bitFont.scale,{x: 1.1, y: 1.1},"bounce",200).onComplete.add(function (){utils.tweenTo(this.GameConfig.bitFont.scale,{x: 1, y: 1},"bounce",200)},this);
		},
  kcashOut: function () {

    this.GameConfig.cashLeft = this.GameConfig.cashLeft + 200;
    this.GameConfig.bitFont.setText((this.GameConfig.cashLeft / 100).toFixed(2));

    if (this.GameConfig.cashLeft > this.GameConfig.currentTotal) {
      this.GameConfig.cashLeft = this.GameConfig.currentTotal - this.GameConfig.currentPrice;
      
      game.time.events.remove(this.GameConfig.timer);
      this.GameConfig.bitFont.setText(this.GameConfig.totalAmount.toFixed(2));
    }

		},
  toggleShoppingCartStrolling: function (target) {
    if (target) {
      this.shoppingCart.animations.stop(null, true);
    } else {
      this.shoppingCart.animations.play('walk', 40, true);
    }
  },
  switchShopper: function () {
    if (!this.GameConfig.characterBoolean) {
      this.GameConfig.characterBoolean = true;
      this.femaleCharacter.visible = this.GameConfig.characterBoolean;
      this.maleCharacter.visible = false;
    } else {
      this.GameConfig.characterBoolean = false;
      this.femaleCharacter.visible = this.GameConfig.characterBoolean;
      this.maleCharacter.visible = true;
    }
  },
  stopStore: function (target) {
    if (target) {
      this.GameConfig.speed = 0;
    } else {
      this.GameConfig.speed = 0.25;
    }
  },
  standStill: function (target) {
    //Make the current walking sprite invisible and display the idle sprite 
    target.visible = !target.visible;
    if (target.key === "Female") {
      //Show the female Standing Idle
      this.GameScene.femaleCharacterIdle.visible = !this.GameScene.femaleCharacterIdle.visible;
    } else {
      this.GameScene.femaleCharacterIdle.visible = !this.GameScene.femaleCharacterIdle.visible;
    }
  },
  toggleWalking: function (target) {
    if (target) {
      this.femaleCharacter.animations.stop(null, true);
    } else {
      this.femaleCharacter.animations.play('walk', 40, true);
    }
  },
  update: function () {


    this.placeProductInAir();
    //this.moveCharacter(this.femaleCharacter);

    this.GameScene.scrollingStoreGroup.x -= this.GameConfig.speed;
    
    if (Math.abs(this.GameScene.scrollingStoreGroup.x) > 2340) {
      this.GameScene.scrollingStoreGroup.x = this.game.width;
    }
  }
};