game.module('game.moduleBg').require('engine.particle', 'engine.audio').body(
        function() {

            game.addAsset('texture_surface.png');
            game.addAsset('texture_ground.png');

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
                                            'texture_ground.png');
                                    sprite.position.set(x, y);
                                    sprite.scale.set(scale, scale);
                                    game.groundLayer.addChild(sprite);
                                }
                            }

                            for (var x = -margin; x < game.system.width
                                    + margin; x += 100 * scale) {
                                for (var y = -margin; y < game.system.height
                                        + margin; y += 100 * scale) {
                                    var sprite = new game.Sprite(
                                            'texture_surface.png');
                                    sprite.position.set(x, y);
                                    sprite.scale.set(scale, scale);
                                    this.applyTweening(sprite);
                                    game.surfaceLayer.addChild(sprite);
                                }
                            }
                        },

                        applyTweening : function(sprite) {
                            var overlayPositionXTween = new game.Tween(
                                    sprite.position);
                            overlayPositionXTween.to({
                                x : sprite.position.x + 30,
                            }, 4000 + 500 * Math.random());
                            overlayPositionXTween
                                    .repeat(Number.MAX_SAFE_INTEGER);
                            overlayPositionXTween.yoyo();
                            overlayPositionXTween
                                    .easing(game.Tween.Easing.Quadratic.InOut);
                            overlayPositionXTween.start();

                            var overlayPositionYTween = new game.Tween(
                                    sprite.position);
                            overlayPositionYTween.to({
                                y : sprite.position.y + 30,
                            }, 4000 + 500 * Math.random());
                            overlayPositionYTween
                                    .repeat(Number.MAX_SAFE_INTEGER);
                            overlayPositionYTween.yoyo();
                            overlayPositionYTween
                                    .easing(game.Tween.Easing.Quadratic.InOut);
                            overlayPositionYTween.start();
                        }
                    });

        });