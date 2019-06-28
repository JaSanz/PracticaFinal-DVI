window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim, Audio") // Load any needed modules
    .setup({width:272, height:224})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch()                            // Add in touch support (for the UI)
    .enableSound();                     // Permite activar el sonido

    // CARGA
    Q.loadTMX("level1.tmx", function() {
        
    });

    // NIVEL 1
    Q.scene("level1", function(stage) {
        Q.stageTMX("level1.tmx", stage);
    });











});