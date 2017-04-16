import 'pixi.js';
import Player from './core/player/Player';
export default class BaseScene extends PIXI.Container {
  public name:string = '';
  private _stage:PIXI.Container;
  private _renderer:PIXI.SystemRenderer;

  public constructor(player:Player){
    super();
    this._stage = player.stage;
    this._renderer = player.renderer;
  }

  public get stage():PIXI.Container {
    return this._stage;
  }

  public get renderer():PIXI.SystemRenderer{
    return this._renderer;
  }

  public render():void{}

  public quit():void{}

  public update():void{}
  
}