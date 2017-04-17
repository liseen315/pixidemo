import BaseScene from './BaseScene';
import Player from './core/player/Player';
import EventConst from './EventConst';
export default class LoadingScene extends BaseScene {
  public static NAME:string = 'loadingScene';

  private _loadingBg:PIXI.Sprite
  private _loadingTF:PIXI.Text;
  private _playBtn:PIXI.Sprite;
  private _loader:PIXI.loaders.Loader;

  public constructor(player:Player){
    super(player);
    this.name = LoadingScene.NAME;
    this._loader = new PIXI.loaders.Loader();
    this._loader.add('Button','../static/audio/Button.mp3');
    this._loader.add('DoInce','../static/audio/DoInce.mp3');
    this._loader.add('DoKalin','../static/audio/DoKalin.mp3');
    this._loader.add('Fa','../static/audio/Fa.mp3');
    this._loader.add('Fail','../static/audio/Fail.mp3');
    this._loader.add('La','../static/audio/La.mp3');
    this._loader.add('Mi','../static/audio/Mi.mp3');
    this._loader.add('Re','../static/audio/Re.mp3');
    this._loader.add('Si','../static/audio/Si.mp3');
    this._loader.add('Sol','../static/audio/Sol.mp3');
    this._loader.add('PlayBtn','../static/images/PlayBtn.png');

    this.startLoading();
  }

  private startLoading():void{
    this._loader.addListener('progress',()=> {

    })
    this._loader.addListener('complete', () => {
      this.removeChild(this._loadingTF);

      this._playBtn = new PIXI.Sprite(this._loader.resources.PlayBtn.texture);
      this.addChild(this._playBtn);
      this._playBtn.x = (this.renderer.width - this._playBtn.width)/2;
      this._playBtn.y = (this.renderer.height - this._playBtn.height)/2;

      this._playBtn.interactive = true;
      this._playBtn.addListener('tap',() => {
        this.emit(EventConst.START_GAME);
      })
    })
    this._loader.load();
  }

  public render():void{
    this._loadingBg = PIXI.Sprite.fromImage('../static/images/LoadingBg.jpg');
    this.addChild(this._loadingBg);

    this._loadingTF = new PIXI.Text('Loading Assets...',{fontFamily: 'Arial', fontSize:24, fill: 0xf3dcb3, align: 'center'});
    this._loadingTF.x = (this.renderer.width -this._loadingTF.width)/2;
    this._loadingTF.y = (this.renderer.height - this._loadingTF.height)/2;
    this.addChild(this._loadingTF);


    this.stage.addChild(this);
  }

  public quit():void{
    this.stage.removeChild(this);
    this._loadingTF = null;
    this._loadingBg = null;
    this._playBtn = null;
  }

}