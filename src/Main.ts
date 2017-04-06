import 'pixi.js';

class Main {

  constructor() {
    let renderer = PIXI.autoDetectRenderer(256, 256);
    document.body.appendChild(renderer.view);
    let stage = new PIXI.Container();
    renderer.render(stage);
    console.log('asdasdasdasd')
  }
}

let main: Main = new Main();


