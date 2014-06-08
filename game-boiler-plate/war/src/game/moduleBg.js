game.module('game.moduleBg').require('engine.particle', 'engine.audio').body(
        function() {

            game.addAsset('texture_water.png');

            BG = game.Class
                    .extend({
                        init : function(x, y) {

                            var scale = 1;

                            var margin = 200;

                            for (var x = -margin; x < game.system.width
                                    + margin; x += 100 * scale) {
                                for (var y = -margin; y < game.system.height
                                        + margin; y += 100 * scale) {
                                    var sprite = new game.Sprite(
                                            'texture_water.png');
                                    sprite.position.set(x, y);
                                    sprite.scale.set(scale, scale);
                                    game.scene.stage.addChild(sprite);
                                }
                            }
                        }
                    });

        });