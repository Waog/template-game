game.module('game.main').require('engine.core', 'game.moduleBoat',
        'game.moduleBlue', 'engine.audio', 'engine.keyboard').body(function() {
    game.addAudio('audio/lalala.m4a', 'music');

    SceneGame = game.Scene.extend({
        backgroundColor : 0xb9bec7,

        boat : null,
        
        init : function() {
            game.audio.playMusic('music');
            this.boat = new Boat(game.system.width / 2, game.system.height / 2);
            this.addObject(this.boat);
        },
    });

    game.addAsset('myBitmapFont.fnt');

    game.start(SceneGame, 1920, 1080);

});
