game.module('game.main').require('engine.core', 'game.moduleBg',
        'game.moduleBoat', 'game.moduleStone', 'game.moduleWaveGenerator', 'game.moduleFishes',
        'game.moduleBlue', 'engine.audio', 'engine.keyboard').body(
        function() {
            game.addAudio('audio/Ocean_2.wav', 'music');
            game.addAudio('audio/scream2.wav', 'lose');
            game.addAudio('audio/yes_hahaha.wav', 'win');

            game.addAsset('title.png');
            game.addAsset('credits.png');
            game.addAsset('win.png');
            game.addAsset('lose.png');
            game.addAsset('startBtn.png');
            game.addAsset('creditsBtn.png');
            game.addAsset('backBtn.png');

            // dumb work around
            game.switchedToMainMenuOnce = false;

            MainMenu = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                init : function() {

                    game.audio.playMusic('music', 0.7);
                    
                    var bg = new game.Sprite('title.png');
                    game.scene.stage.addChild(bg);
                    var startBtn = new game.Sprite('startBtn.png');
                    startBtn.position.set(100, 750);
                    game.scene.stage.addChild(startBtn);
                    var creditsBtn = new game.Sprite('creditsBtn.png');
                    creditsBtn.position.set(780, 750);
                    game.scene.stage.addChild(creditsBtn);

                    startBtn.interactive = true;
                    startBtn.buttonMode = true;
                    var startAction = function() {
                        game.system.setScene(SceneGame);
                    }
                    startBtn.click = startAction;
                    startBtn.tap = startAction;
                    
                    creditsBtn.interactive = true;
                    creditsBtn.buttonMode = true;
                    var creditsAction = function() {
                        game.system.setScene(CreditsMenu);
                    }
                    creditsBtn.click = creditsAction;
                    creditsBtn.tap = creditsAction;
                },
            });

            CreditsMenu = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                init : function() {

                    var bg = new game.Sprite('credits.png');
                    game.scene.stage.addChild(bg);
                    var backBtn = new game.Sprite('backBtn.png');
                    backBtn.position.set(100, 750);
                    game.scene.stage.addChild(backBtn);

                    backBtn.interactive = true;
                    backBtn.buttonMode = true;
                    backBtn.click = function() {
                        game.system.setScene(MainMenu);
                    }
                    backBtn.tap = backBtn.click;
                },
            });

            WinScreen = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                init : function() {

                    var bg = new game.Sprite('win.png');
                    game.scene.stage.addChild(bg);
                    var backBtn = new game.Sprite('backBtn.png');
                    backBtn.position.set(100, 750);
                    game.scene.stage.addChild(backBtn);

                    backBtn.interactive = true;
                    backBtn.buttonMode = true;
                    backBtn.click = function() {
                        game.system.setScene(MainMenu);
                    }
                    backBtn.tap = backBtn.click;
                },
            });

            LoseScreen = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                init : function() {

                    var bg = new game.Sprite('lose.png');
                    game.scene.stage.addChild(bg);
                    var backBtn = new game.Sprite('backBtn.png');
                    backBtn.position.set(100, 750);
                    game.scene.stage.addChild(backBtn);

                    backBtn.interactive = true;
                    backBtn.buttonMode = true;
                    backBtn.click = function() {
                        game.system.setScene(MainMenu);
                    }
                    backBtn.tap = backBtn.click;
                },
            });

            SceneGame = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                boat : null,

                init : function() {
                    game.groundLayer = new game.Container();
                    game.scene.stage.addChild(game.groundLayer);
                    game.fishLayer = new game.Container();
                    game.scene.stage.addChild(game.fishLayer);
                    game.surfaceLayer = new game.Container();
                    game.scene.stage.addChild(game.surfaceLayer);
                    game.spumeLayer = new game.Container();
                    game.scene.stage.addChild(game.spumeLayer);
                    game.boatLayer = new game.Container();
                    game.scene.stage.addChild(game.boatLayer);
                    game.skyLayer = new game.Container();
                    game.scene.stage.addChild(game.skyLayer);

                    game.world = new game.World(0, 0);

                    new BG();

                    game.boat = new Boat(game.system.width * 0.1,
                            game.system.height * 0.1, this.onWin, this.onLose);
                    game.stone = new Stone(game.system.width * 0.9,
                            game.system.height * 0.9, this.onLose);
                    var waveGen = new WaveGenerator();
                    this.addObject(game.stone);
                    this.addObject(game.boat);
                    this.addObject(waveGen);
                    
//                    var fishes = new Fishes(500, 500, 2, 1000);
//                    this.addObject(fishes);
                },

                winningSequenceActive : false,
                
                onWin : function() {
                    if (this.winningSequenceActive) {
                        return;
                    }
                    this.winningSequenceActive = true;
                    
                    game.audio.playSound('win', false, 4);

                    var winOverlay = new game.Sprite('win.png');
                    winOverlay.alpha = 0;
                    game.scene.stage.addChild(winOverlay);

                    var tween = new game.Tween(winOverlay);
                    tween.to({
                        alpha : 1
                    }, 2000);
                    tween.onComplete(function() {
                        this.winningSequenceActive = false;
                        game.system.setScene(WinScreen);
                    })
                    tween.start();
                },

                losingSequenceActive : false,

                onLose : function() {

                    if (this.losingSequenceActive) {
                        return;
                    }
                    this.losingSequenceActive = true;

                    game.audio.playSound('lose', false, 1);

                    var loseOverlay = new game.Sprite('lose.png');
                    loseOverlay.alpha = 0;
                    game.scene.stage.addChild(loseOverlay);

                    var tween = new game.Tween(loseOverlay);
                    tween.to({
                        alpha : 1
                    }, 4000);
                    tween.onComplete(function() {
                        this.losingSequenceActive = false;
                        game.system.setScene(LoseScreen);
                    })
                    tween.start();
                }
            });

            game.addAsset('myBitmapFont.fnt');

//            game.System.webGL = true;
            
            game.start(MainMenu, 1280, 1024);
        });
