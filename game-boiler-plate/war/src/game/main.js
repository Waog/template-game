game.module('game.main').require('engine.core', 'game.moduleBg',
        'game.moduleBoat', 'game.moduleStone', 'game.moduleWaveGenerator',
        'game.moduleBlue', 'engine.audio', 'engine.keyboard').body(
        function() {
            game.addAudio('audio/Ocean_2.wav', 'music');

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
                    game.world = new game.World(0, 0);

                    new BG();

                    game.audio.playMusic('music');
                    game.stone = new Stone(game.system.width * .9,
                            game.system.height * .9);
                    game.boat = new Boat(30, 30, this.onWin, this.onLose);
                    this.addObject(game.boat);

                    var waveGen = new WaveGenerator();
                    this.addObject(waveGen);
                },

                onWin : function() {
                    var winOverlay = new game.Sprite('win.png');
                    winOverlay.alpha = 0;
                    game.scene.stage.addChild(winOverlay);

                    var tween = new game.Tween(winOverlay);
                    tween.to({
                        alpha : 1
                    }, 2000);
                    tween.onComplete(function() {
                        game.system.setScene(WinScreen);
                    })
                    tween.start();
                },

                onLose : function() {
                    var loseOverlay = new game.Sprite('lose.png');
                    loseOverlay.alpha = 0;
                    game.scene.stage.addChild(loseOverlay);

                    var tween = new game.Tween(loseOverlay);
                    tween.to({
                        alpha : 1
                    }, 2000);
                    tween.onComplete(function() {
                        game.system.setScene(LoseScreen);
                    })
                    tween.start();
                }
            });

            game.addAsset('myBitmapFont.fnt');

            game.start(MainMenu, 1280, 1024);
        });
