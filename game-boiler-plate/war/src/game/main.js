game.module('game.main').require('engine.core', 'game.moduleBg',
        'game.moduleBoat', 'game.moduleStone', 'game.moduleWaveGenerator', 'game.moduleBlue',
        'engine.audio', 'engine.keyboard').body(
        function() {
            game.addAudio('audio/Ocean_2.wav', 'music');

            SceneGame = game.Scene.extend({
                backgroundColor : 0xb9bec7,

                boat : null,

                init : function() {
                    game.world = new game.World(0, 0);

                    new BG();
                    
                    game.audio.playMusic('music');
                    game.stone = new Stone(1800, 900);
                    game.boat = new Boat(game.system.width - 20, game.system.height - 20);
                    this.addObject(game.boat);
                    
                    var waveGen = new WaveGenerator();
                    this.addObject(waveGen);
                },
            });

            game.addAsset('myBitmapFont.fnt');

            game.start(SceneGame, 1920, 1080);

        });
