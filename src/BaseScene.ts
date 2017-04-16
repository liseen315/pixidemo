import 'pixi.js';
import Player from './core/player/Player';
export default class BaseScene extends PIXI.Container {
  public name:string = '';
  private _stage:PIXI.Container;
  private _renderer:PIXI.SystemRenderer;
  private _tick:PIXI.ticker.Ticker;

  public constructor(player:Player){
    super();
    this._stage = player.stage;
    this._renderer = player.renderer;
    this._tick = player.ticker;
  }

  public get stage():PIXI.Container {
    return this._stage;
  }

  public get renderer():PIXI.SystemRenderer{
    return this._renderer;
  }

  public get ticker():PIXI.ticker.Ticker{
    return this._tick;
  }

  public render():void{
    this._tick.add(this.update,this);
  }

  public quit():void{}  

  public update():void{}
}