game.module('game.moduleBg').require('engine.particle', 'engine.audio').body(
        function() {

            game.addAsset('texture_water.png');

            BG = game.Class.extend({
                init : function(x, y) {

                    var scale = 1;

                    for (var x = 0; x < 2000; x += 100 * scale) {
                        for (var y = 0; y < 1100; y += 100 * scale) {
                            var sprite = new game.Sprite('texture_water.png');
                            sprite.position.set(x, y);
                            sprite.scale.set(scale, scale);
                            game.scene.stage.addChild(sprite);
                        }
                    }
                }
            });

        });