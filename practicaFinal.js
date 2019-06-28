window.addEventListener("load",function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim, Audio") // Load any needed modules
    .setup({width:272, height:224})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch()                            // Add in touch support (for the UI)
    .enableSound();                     // Permite activar el sonido

    // CARGA
    Q.loadTMX("level1.tmx", function() {
        Q.stageScene("level1");
    });

    // NIVEL 1
    Q.scene("level1", function(stage) {
        Q.stageTMX("level1.tmx", stage);

        stage.insert(new Q.Key({x : 64, y : 112}));
    });


    // CABEZA
    Q.Sprite.extend("Key", {
        init: function(p) {
            this._super(p, { 
           // sprite: "key",
            asset: "keyP.png",
            sensor: true,
            cogida: false,
            gravity: 0
        });
        this.add("2d");
        //this.add("tween");
        this.on("hit", this, "hit");
    },
    //hit: function(collision){
       /* if(collision.obj.isA("Mario") && !this.cogida){ 
            Q.state.inc('coins', 1);
            Q.state.inc('punct', 100);
            if(Q.state.get('coins') == 100)
                Q.audio.play('1up.mp3', { loop: false });
            else 
                Q.audio.play('coin.mp3', { loop: false });
            this.cogida = true;
            this.animate(
                {y: this.p.y-50}, 0.3, Q.Easing.Linear, 
                { callback: function(){ this.destroy() } });
            if(Q.state.get('coins') == 100) {
                Q.state.inc('lives', 1);
                Q.state.dec('coins', 100);
            }

        }
        */
   // }

    });



    // CARGA Y COMPILADO DE ARCHIVOS
    Q.load(["keyP.png"
        ], function() {

    });





});