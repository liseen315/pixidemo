import BaseScene from './BaseScene';
import Player from './core/player/Player';
import MConfig from './MConfig';

export default class GameScene extends BaseScene {
  public static NAME:string = 'gameScene';
  private _selectMusic:Array<number>;
  private _bgGraphics:PIXI.Graphics;
  private _touchPlayTF:PIXI.Text;
  private _touchLayer:PIXI.Sprite;
  private _ballBox:PIXI.Container;
  private _topBall:PIXI.Graphics;
  private _bottomBall:PIXI.Graphics;
  private _leftWall:PIXI.Graphics;
  private _rightWall:PIXI.Graphics;
  private _ballColorList:Array<number>;

  constructor(player:Player) {
    super(player);
    this.name = GameScene.NAME;
    this.selectMusic();
    this._ballColorList = this.createBallColor();
    //生成小球
    this.createBallBox();
  }

  private selectMusic():void{
    //当前只有一首歌.....其他的歌需要慢慢补..
    let musicIndex = parseInt(this.rang(0,0).toString(),10);
    switch(musicIndex){
      case 0:
      this._selectMusic = MConfig.xiaoXX;
      break;
    }
  }

  private createBallBox():void{
    this._ballBox = new PIXI.Container();
    this._topBall = new PIXI.Graphics();
    this._topBall.beginFill(this._ballColorList[0]);
    this._topBall.drawCircle(0,0,50);
    this._topBall.endFill();
    this._topBall.hitArea = new PIXI.Rectangle(0,0,100,100);
    this._ballBox.addChild(this._topBall);

    this._bottomBall = new PIXI.Graphics();
    this._bottomBall.beginFill(this._ballColorList[1]);
    this._bottomBall.drawCircle(0,100,50);
    this._bottomBall.hitArea = new PIXI.Rectangle(0,0,100,100);
    this._bottomBall.endFill();
    this._ballBox.addChild(this._bottomBall);

    this._leftWall = new PIXI.Graphics();
    this._leftWall.beginFill(0x00ff00);
    this._leftWall.drawRect(-70,0,20,100);
    this._leftWall.endFill();
    this._leftWall.hitArea = new PIXI.Rectangle(0,0,20,100);
    this._ballBox.addChild(this._leftWall);

    this._rightWall = new PIXI.Graphics();
    this._rightWall.beginFill(0x00ff00);
    this._rightWall.drawRect(50,0,20,100);
    this._rightWall.endFill();
    this._rightWall.hitArea = new PIXI.Rectangle(0,0,20,100);
    this._ballBox.addChild(this._rightWall);
  }

  private createBallColor():Array<number>{
    let index = 0;
    let colorConfigList = MConfig.ballColor;
    let tempList:Array<number> = [];
    while(index < 2){
      let targetIndex = parseInt(this.rang(0,colorConfigList.length).toString(),10);
      tempList.push(colorConfigList[targetIndex]);
      colorConfigList.splice(targetIndex,1);
      index++;
    }
    return tempList;
  }

  private rang(min:number,max:number):number {
    return Math.random()*(max-min) + min;
  }

  public render():void{
    this._bgGraphics = new PIXI.Graphics();
    this._bgGraphics.beginFill(0xFFFFFF);
    this._bgGraphics.drawRect(0,0,this.renderer.width,this.renderer.height);
    this._bgGraphics.endFill();
    this.addChild(this._bgGraphics);

    this._touchPlayTF =  new PIXI.Text('Tab to start',{fontFamily: 'Arial', fontSize:35, fill: 0x000000, align: 'center'});
    this.addChild(this._touchPlayTF);
    this._touchPlayTF.x = (this.renderer.width -  this._touchPlayTF.width)/2;
    this._touchPlayTF.y = 50;

    //添加小球到渲染
    this.addChild(this._ballBox);
    this._ballBox.x =  (this.renderer.width)/2;
    this._ballBox.y = (this.renderer.height - this._ballBox.height)/2;

    this._touchLayer = new PIXI.Sprite();
    this._touchLayer.width = this.renderer.width;
    this._touchLayer.height = this.renderer.height;
    this.addChild(this._touchLayer);
    this._touchLayer.interactive = true;
    this._touchLayer.addListener('tap',()=>{
      console.log('旋转！');
    })
    this.stage.addChild(this);
  }

  public quit():void{

  }
}