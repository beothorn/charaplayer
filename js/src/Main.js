var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
    .add('guy','media/guy.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(load, resources)
{    

    var animations = {};
    Object.keys(resources.guy.data.animations).map((name) => animations[name] = resources.guy.data.animations[name].map(PIXI.Texture.fromFrame));

    play("actions0", animations);

    animate();
}

function animate(time) {
    renderer.render(stage);
    TWEEN.update(time);
    requestAnimationFrame(animate);
}