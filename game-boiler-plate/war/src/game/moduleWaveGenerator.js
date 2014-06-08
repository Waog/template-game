game
        .module('game.moduleWaveGenerator')
        .require('engine.particle', 'engine.audio', 'game.moduleBalancing',
                'game.moduleWave')
        .body(
                function() {

                    WaveGenerator = game.Class
                            .extend({

                                timeToNextWave : 0,
                                timeToNextPushBackWave : 0,
                                waveInterval : 3,
                                pushBackInterval : 1,

                                init : function() {
                                },

                                update : function() {
                                    // generate random waves
                                    this.timeToNextWave -= game.system.delta;
                                    if (this.timeToNextWave <= 0) {
                                        this.timeToNextWave = this.waveInterval;
                                        this.genRandomWave();
                                    }

                                    // if player is close to screen border...
                                    // push him back
                                    this.timeToNextPushBackWave -= game.system.delta;
                                    var padding = 50;
                                    if (this.timeToNextPushBackWave <= 0) {
                                        if (game.boat.x < padding
                                                || game.boat.x > game.system.width
                                                        - padding
                                                || game.boat.y < padding
                                                || game.boat.y > game.system.height
                                                        - padding) {
                                            this.genPushBackWave();
                                            this.timeToNextPushBackWave = this.pushBackInterval;
                                        }
                                    }
                                },

                                genRandomWave : function() {
                                    var centerX = game.system.width * Math.random();
                                    var centerY = game.system.height * Math.random();
                                    var sizeX = game.system.width * Math.random();
                                    var sizeY = game.system.height * Math.random();
                                    var elementCount = Math.ceil(sizeX / 100 * sizeY / 100 * Math.random());
                                    var a = 2 * Math.PI * Math.random();
                                    
                                    for (var i = 0; i < elementCount; i++) {
                                        var x = centerX - sizeX / 2 + Math.random() * sizeX;
                                        var y = centerY - sizeY / 2 + Math.random() * sizeY;
                                        var lifeTime = 4 * 1000 * this.waveInterval * Math.random();
                                        var maxInfluence = 0.1 * Math.random();
                                        var wave = new Wave(x, y, a, lifeTime,
                                                maxInfluence);
                                        game.scene.addObject(wave);   
                                    }
                                },

                                genPushBackWave : function() {
                                    var x = game.boat.x;
                                    var y = game.boat.y;

                                    var quadrant = 0;
                                    var deltaX = Math.abs(game.system.width / 2
                                            - game.boat.x);
                                    var deltaY = Math.abs(game.system.height
                                            / 2 - game.boat.y);
                                    var a = 2 * Math.PI * Math.random();
                                    if (x < game.system.width / 2
                                            && y > game.system.height / 2) {
                                        quadarant = 1;
                                        a = Math.atan(deltaX / deltaY);
                                        console.log('q1, a=', a);
                                    } else if (x < game.system.width / 2
                                            && y < game.system.height / 2) {
                                        quadarant = 2;
                                        a = Math.atan(deltaY / deltaX) + 0.5
                                                * Math.PI;
                                        console.log('q2, a=', a, 'dX', deltaX,
                                                'dy', deltaY);
                                    } else if (x > game.system.width / 2
                                            && y < game.system.height / 2) {
                                        quadarant = 3;
                                        a = Math.atan(deltaX / deltaY) + 1
                                                * Math.PI;
                                        console.log('q3, a=', a, 'dX', deltaX,
                                                'dy', deltaY);
                                    } else if (x > game.system.width / 2
                                            && y > game.system.height / 2) {
                                        quadarant = 4;
                                        a = Math.atan(deltaY / deltaX) + 1.5
                                                * Math.PI;
                                        console.log('q4, a=', a);
                                    }

                                    var lifeTime = 500 * Math.random() + 500;
                                    var maxInfluence = 0.3;
                                    var wave = new Wave(x, y, a, lifeTime,
                                            maxInfluence);
                                    game.scene.addObject(wave);
                                }
                            });
                });