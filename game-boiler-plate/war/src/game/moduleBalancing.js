game.module('game.moduleBalancing').require().body(function() {
    
    game.Balancing = game.Class.extend({
        test : 'hello',
        
        // boat:
        paddlePower : 40,
        paddlePowerAngle : 1,
        paddlePowerV2 : 20,
        paddlePowerAngleV2 : 0.8,
        slowRate : 0.99,
        downTimeToSlow : 0.3,
        waveVelocity : 100,
        maxWavePower : 0.05,
    });
    
    game.balancing = new game.Balancing();
});
