var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add('guy','media/guy.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(load, resources)
{    
    var upWalkFrames = resources.guy.data.animations["upWalk"];

    var upWalk = upWalkFrames.map(PIXI.Texture.fromFrame);

    var movie = new PIXI.extras.MovieClip(upWalk);
    movie.position.set(0,0);
    movie.animationSpeed = 0.1;
    movie.play();

    stage.addChild(movie);

    animate();
}

function animate() {
    renderer.render(stage);
    requestAnimationFrame(animate);
}