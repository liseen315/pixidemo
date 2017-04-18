import BaseScene from './BaseScene';
import Player from './core/player/Player';
import EventConst from './EventConst';

export default class OverScene extends BaseScene {
  public static NAME = 'OverScene';
  private _overBg: PIXI.Sprite;
  private _playBtn: PIXI.Sprite;
  public constructor(player: Player) {
    super(player)
    this.name = OverScene.NAME;
  }

  public render(): void {
    this._overBg = PIXI.Sprite.fromImage('../static/images/LoadingBg.jpg');
    this.addChild(this._overBg);

    this._playBtn = PIXI.Sprite.fromImage('../static/images/PlayBtn.png');
    this.addChild(this._playBtn);
    this._playBtn.x = (this.renderer.width - this._playBtn.width) / 2;
    this._playBtn.y = (this.renderer.height - this._playBtn.height) / 2;

    this._playBtn.interactive = true;
    this._playBtn.addListener('tap', () => {
      this.emit(EventConst.START_GAME);
    })
    this.stage.addChild(this);
  }

  public quit(): void {
    console.log('quit!');
    this.stage.addChild(this);
  }
} 