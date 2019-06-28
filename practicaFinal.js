//TODO mirar el tema del audio
//TODO mirar el json. NPI de cómo hacerlo bien
//TODO ajustar velocidad de animaciones de Dana. Comprobar con gameplays
//TODO mirar si se pueden disparar bolas de fuego estando agachado

const xBloques = 17;
const yBloques = 14;

window.addEventListener("load", function() {

    var Q = Quintus()                          // Create a new engine instance
    .include("Sprites, Scenes, Input, Touch, UI, 2D, TMX, Anim") // Load any needed modules
    .setup({width:xBloques * 16, height:yBloques * 16})     // Add a canvas element onto the page
    .controls()                         // Add in default controls (keyboard, buttons)
    .touch();                            // Add in touch support (for the UI)

    // DANA
    Q.Sprite.extend("Mario", {
        init: function(p) {
            this._super(p, {
                sprite: "animaciones_dana",
                sheet: "danaR",
                jumpSpeed: -650,
                speed: 220,
                gravity: 1.5,
                fireballs: 0,
                muerto: false
            });

            this.add('2d, platformerControls, animation');

            this.on("muerte_t", this, "muerte");

            this.on("bump.bottom", function(collision) {
                if(collision.obj.isA("Goomba") && !this.p.muerto) {
                    if(Q.inputs['up']) {
                        this.p.vy = -500;
                    }
                    else {
                        this.p.vy = -300;
                    }
                }
            });
        },

        step: function(dt) {
            relativeX = -1;
            relativeY = -1;
            direccion = "";

            //quieto_derecha: {frames: [12], loop: false},
            //quieto_izquierda: {frames: [0], loop: false},
            //quieto_agachado_derecha: {frames: [13], loop: false},
            //quieto_agachado_izquierda: {frames: [1], loop: false},
            //corriendo_derecha: {frames: [14, 15, 16, 17], rate: 1/13, loop: true},
            //corriendo_izquierda: {frames: [2, 3, 4, 5], rate: 1/13, loop: true},
            //saltando_quieto_derecha: {frames: [12], loop: false},
            //saltando_quieto_izquierda: {frames: [0], loop: false},
            //saltando_corriendo_derecha: {frames: [14], loop: false},
            //saltando_corriendo_izquierda: {frames: [2], loop: false},
            //varita_derecha: {frames: [18, 19], rate: 1/5, loop: false},
            //varita_izquierda: {frames: [6, 7], rate: 1/5, loop: false},
            //varita_agachado_derecha: {frames: [20, 21, 22], rate: 1/5, loop: false},
            //varita_agachado_izquierda: {frames: [8, 9, 10], rate: 1/5, loop: false},
            //NOmuerte_derecha: {frames: [23], loop: false, trigger: "muerte_t"},
            //NOmuerte_izquierda: {frames: [11], loop: false, trigger: "muerte_t"}

            //Cogemos la dirección de Mario para usarla con las animaciones
            if(this.p.direction == 'right')
                direccion = "derecha";
            else
                direccion = "izquierda";

            //Animaciones
            if(this.p.vx == 0) {
                if(this.p.landed < 0) {
                    this.play("saltando_quieto_" + direccion);
                }
                else if(this.p.landed >= 0 && Q.inputs['down'])
                    this.play("quieto_agachado_" + direccion);
                else
                    this.play("quieto_" + direccion);
            }
            else {
                if(this.p.landed < 0)
                    this.play("saltando_corriendo_" + direccion);
                else
                    this.play("corriendo" + direccion);
            }

            /*
            Al pulsar el botón de acción, se debe poner o quitar un bloque. Funciona de la forma:
                Primero cogemos la dirección del protagonista y calculamos las posiciones relativas 
                    (es decir, las correspondientes al bloque) para el eje x y el y. En este proceso
                    comprobamos también si la tecla abajo está siendo pulsada para ajustar la posición
                    relativa sobre el eje y.
                A continuación, comprobamos si las posiciones calculadas son válidas para poner un
                    bloque dentro del nivel. Para esto cogemos el tamaño del canvas en número de
                    bloques. Si para el número de bloques de ancho, la posición relativa está entre
                    2 y 16 incluidos, es una posición válida. Para el eje Y se comprueba tan solo para
                    un valor mayor o igual que 2. El tope de altura da igual porque nunca se alcanza.
                    NOTA: los bloque se empiezan a contar por 1.
            */
            if(Q.inputs['action']) {
                if(direccion == 'right') {
                    relativeX = (this.p.x / 16) + 1;
                    relativeY = this.p.y / 16;
                }
                else {
                    relativeX = (this.p.x / 16) - 1;
                    relativeY = this.p.y / 16;
                }
                if(Q.inputs['down']) {
                    relativeY -= 1;
                    this.play("varita_agachado_" + direccion);
                }
                else
                    this.play("varita_" + direccion);

                if((relativeX * 16 > 1 || relativeX * 16 < 17) && relativeY > 1) {
                    Q.scene("hey", function(stage) {
                        console.log("AAAAA");
                    });
                }
            }
            
            else {
                if (this.p.vx != 0)
                    this.play("corriendo_" + direccion);
                else if (this.p.vx != 0 && this.p.speed > 220)
                    this.play("corriendo_rapido_" + direccion);
                else
                    this.play("quieto_" + direccion);
            }

            if(Q.inputs['fire'] && (Q.inputs['left'] || Q.inputs['right'])) {
                this.p.speed += 5;
                if(this.p.speed > 320) 
                    this.p.speed = 320;
            }
            else {
                this.p.speed -= 5;
                if(this.p.speed < 220) 
                    this.p.speed = 220;
            }

            //Matamos a Mario cuando se cae del escenario
            if(this.p.y > 590 && !this.p.muerto) {
                this.muerteAux();
            }
            //Para que no se salga del borde izquierdo
            if(this.p.x < 210) {
                this.p.x = 210;
            }
            
        },

        muerteAux: function(p) {
                if((this.p.level == 0 || this.p.y > 590) && !this.p.muerto) {
                    this.p.muerto = true;
                    Q.state.dec("lives", 1);
                    this.p.vy = -500;
                    this.p.collisionMask = Q.SPRITE_NONE;
                    Q.audio.stop();
		            Q.audio.play('music_die.mp3',{ loop: false });
                    this.play("muerte", 4); //Hacemos que desaparezca a los dos segundos para evitar situaciones no deseadas
                }      
        },
        
        muerte: function(p) {
            this.destroy();
            if(Q.state.get("lives") == 0)
                Q.stageScene("endGame",1, { label: "You Died" });
            else {
                level = "level" + Q.state.get("level");
                Q.clearStages();
                Q.stageScene(level);
                Q.stageScene("hud", 1);
            }
        }

    });

    // ANIMACIONES DE DANA
    Q.animations("animaciones_dana", {
        quieto_derecha: {frames: [12], loop: false},
        quieto_izquierda: {frames: [0], loop: false},
        quieto_agachado_derecha: {frames: [13], loop: false},
        quieto_agachado_izquierda: {frames: [1], loop: false},
        corriendo_derecha: {frames: [14, 15, 16, 17], rate: 1/13, loop: true},
        corriendo_izquierda: {frames: [2, 3, 4, 5], rate: 1/13, loop: true},
        saltando_quieto_derecha: {frames: [12], loop: false},
        saltando_quieto_izquierda: {frames: [0], loop: false},
        saltando_corriendo_derecha: {frames: [14], loop: false},
        saltando_corriendo_izquierda: {frames: [2], loop: false},
        varita_derecha: {frames: [18, 19], rate: 1/5, loop: false},
        varita_izquierda: {frames: [6, 7], rate: 1/5, loop: false},
        varita_agachado_derecha: {frames: [20, 21, 22], rate: 1/5, loop: false},
        varita_agachado_izquierda: {frames: [8, 9, 10], rate: 1/5, loop: false},
        muerte_derecha: {frames: [23], loop: false, trigger: "muerte_t"},
        muerte_izquierda: {frames: [11], loop: false, trigger: "muerte_t"}
    });


    // CARGA Y COMPILADO DE ARCHIVOS
    Q.load(["dana.png", "dana.json"
        ], function() {
        Q.compileSheets("dana.png", "dana.json");
    });

});