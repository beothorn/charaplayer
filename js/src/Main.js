console.log("Hello");

var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

PIXI.loader
    .add('guy','media/guy.json')
    .load(onAssetsLoaded);

var movie;

function onAssetsLoaded()
{
    /**
    var pathTextures = [];
    for(var col = 0; col < 3; col++){
        pathTextures[col] = [];
        for(var line = 0; line < 4; line++){
            pathTextures[col][line] = new PIXI.Texture(PIXI.utils.TextureCache['media/guy.png']);
            pathTextures[col][line].frame = new PIXI.Rectangle(72*col, 96*line, 72, 96);
        }
    }
    **/

    var upWalk = [
        PIXI.Texture.fromFrame('upLeft'),
        PIXI.Texture.fromFrame('upStopped'),
        PIXI.Texture.fromFrame('upRight'),
        PIXI.Texture.fromFrame('upStopped')
    ];

    movie = new PIXI.extras.MovieClip(upWalk);
    movie.position.set(300);
    movie.anchor.set(0.5);
    movie.animationSpeed = 0.1;
    movie.play();

    stage.addChild(movie);

    animate();
}

function animate() {
    // render the stage container
    renderer.render(stage);

    requestAnimationFrame(animate);
}