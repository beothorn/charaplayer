var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var cellWidth = 24;
var cellHeight = 32;

PIXI.loader
    .add('guy','media/guy.json')
    .load(onAssetsLoaded);

function onAssetsLoaded(load, resources)
{    

    var animations = {};
    Object.keys(resources.guy.data.animations).map((name) => animations[name] = resources.guy.data.animations[name].map(PIXI.Texture.fromFrame));

    microAjax("/server/actions0.json", function (res){ 
        //console.log(res); 
    });

    var movie = new PIXI.extras.MovieClip(animations.downWalk);
    movie.position.set(0,0);
    movie.animationSpeed = 0.1;
    movie.play();

    stage.addChild(movie);
    var coords = { x: 0, y: 0 };
    var tween = new TWEEN.Tween(coords)
    .to({ x: 100, y: 100}, 1000)
    .onUpdate(function() {
        movie.position.set(this.x, this.y);
    })
    .onComplete(() => console.log("DONE"))
    .start();

    animate();
}

function animate(time) {
    renderer.render(stage);
    TWEEN.update(time);
    requestAnimationFrame(animate);
}