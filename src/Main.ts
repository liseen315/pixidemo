import Player from './core/player/Player';
import { IPlayerOption } from './core/interface/IPlayerOption';
import 'pixi.js';

class Main {
  private player: Player;
  private loader:PIXI.loaders.Loader;
  constructor() {
    this.initPlayer();
    this.initBg();
  }
  private initPlayer(): void {
    let holder = document.getElementById('player-holder');
    this.player = new Player(holder as HTMLDivElement);
  }

  private initBg():void{
    let bg:PIXI.Sprite;
    this.loader = new PIXI.loaders.Loader();
    this.loader.add('background','../static/images/bg.jpg');
    this.loader.addListener('progress',()=>{
      console.log('loading...');
    })
    this.loader.addListener('complete',()=>{
      bg = new PIXI.Sprite(this.loader.resources.background.texture);
      this.player.stage.addChild(bg);
      this.player.run();
    })
    this.loader.load();
  }
}
new Main();


