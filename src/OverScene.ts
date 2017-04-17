import BaseScene from './BaseScene';
import Player from './core/player/Player';
import EventConst from './EventConst';

export default class OverScene extends BaseScene {
  public static NAME = 'OverScene';
  private _overBg: PIXI.Sprite;
  public constructor(player: Player) {
    super(player)
    this.name = OverScene.NAME;
  }

  public render(): void {
    this._overBg = PIXI.Sprite.fromImage('../static/images/LoadingBg.jpg');
    this.addChild(this._overBg);
    this._overBg.interactive = true;
    this._overBg.addListener('tap', () => {
      this.emit(EventConst.START_GAME);
    })
    this.stage.addChild(this);
  }

  public quit(): void {

  }
} 