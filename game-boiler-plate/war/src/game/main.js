game.module('game.main').require('engine.core', 'game.moduleBg',
        'game.moduleBoat', 'game.moduleStone', 'game.moduleWaveGenerator',
        'game.moduleBlue', 'engine.audio', 'engine.keyboard').body(
        function() {
            game.addAudio('audio/Ocean_2.m4a', 'music');
            game.addAudio('audio/scream2.m4a', 'lose');
            game.addAudio('audio/yes_hahaha.m4a', 'win');

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
                    startBtn.click = function() {
                        game.system.setScene(SceneGame);
                    }
                    creditsBtn.interactive = true;
                    creditsBtn.buttonMode = true;
                    creditsBtn.click = function() {
                        game.system.setScene(CreditsMenu);
                    }
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

                    game.stone = new Stone(game.system.width * 1.1,
                            game.system.height * 1.1, this.onLose);
                    this.addObject(game.stone);
                    game.boat = new Boat(0, 0, this.onWin, this.onLose);
                    this.addObject(game.boat);

                    var waveGen = new WaveGenerator();
                    this.addObject(waveGen);
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
                    }, 3000);
                    tween.onComplete(function() {
                        this.losingSequenceActive = false;
                        game.system.setScene(LoseScreen);
                    })
                    tween.start();
                }
            });

            game.addAsset('myBitmapFont.fnt');

            game.start(MainMenu, 1280, 1024);
        });
