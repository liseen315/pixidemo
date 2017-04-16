import BaseScene from './BaseScene';
import Player from './core/player/Player';
import MConfig from './MConfig';
import {TweenLite,Expo} from 'gsap';
import TargetBall from './TargetBall';

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
  private _tapToStart:Boolean = true;
  private _touchCount:number = -1;
  private _sourceTF:PIXI.Text;
  //产生的小球的出现方向
  private _direction:number = 1;
  private _targetBall:TargetBall;
  private _targetBallSpeed:number = 6;
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
    this._topBall.drawCircle(0,0,30);
    this._topBall.endFill();
    this._topBall.hitArea = new PIXI.Rectangle(0,0,60,60);
    this._ballBox.addChild(this._topBall);

    this._bottomBall = new PIXI.Graphics();
    this._bottomBall.beginFill(this._ballColorList[1]);
    this._bottomBall.drawCircle(0,60,30);
    this._bottomBall.hitArea = new PIXI.Rectangle(0,0,60,60);
    this._bottomBall.endFill();
    this._ballBox.addChild(this._bottomBall);

    this._leftWall = new PIXI.Graphics();
    this._leftWall.beginFill(0x00ff00);
    this._leftWall.drawRect(-40,0,20,60);
    this._leftWall.endFill();
    this._leftWall.hitArea = new PIXI.Rectangle(0,0,20,100);
    this._ballBox.addChild(this._leftWall);

    this._rightWall = new PIXI.Graphics();
    this._rightWall.beginFill(0x00ff00);
    this._rightWall.drawRect(20,0,20,60);
    this._rightWall.endFill();
    this._rightWall.hitArea = new PIXI.Rectangle(0,0,20,100);
    this._ballBox.addChild(this._rightWall);

    this._ballBox.pivot = new PIXI.Point(0,30);
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
    super.render();
    this._bgGraphics = new PIXI.Graphics();
    this._bgGraphics.beginFill(0xFFFFFF);
    this._bgGraphics.drawRect(0,0,this.renderer.width,this.renderer.height);
    this._bgGraphics.endFill();
    this.addChild(this._bgGraphics);

    this._touchPlayTF =  new PIXI.Text('Tap to start',{fontFamily: 'Arial', fontSize:80, fill: 0x000000, align: 'center'});
    this.addChild(this._touchPlayTF);
    this._touchPlayTF.x = (this.renderer.width -  this._touchPlayTF.width)/2;
    this._touchPlayTF.y = 220;

    //平分
    this._sourceTF = new PIXI.Text('0',{fontFamily: 'Arial', fontSize:60, fill: 0x000000, align: 'center'});
    this.addChild(this._sourceTF);
    this._sourceTF.y = 220;
    this._sourceTF.x = -(this._sourceTF.width);

    //添加小球到渲染
    this.addChild(this._ballBox);
    this._ballBox.x =  (this.renderer.width)/2;
    this._ballBox.y = (this.renderer.height - this._ballBox.height)/2 + 60;

    this._touchLayer = new PIXI.Sprite();
    this._touchLayer.width = this.renderer.width;
    this._touchLayer.height = this.renderer.height;
    this.addChild(this._touchLayer);
    this._touchLayer.interactive = true;
    this._touchLayer.addListener('tap',this.rotationBallBox,this);
    this.stage.addChild(this);
  }

  private rotationBallBox():void{
    if(this._tapToStart){
      this._touchPlayTF.visible = false;
      this._tapToStart = false;
      TweenLite.to(this._sourceTF,0.5,{
        x:(this.renderer.width-this._sourceTF.width)/2,
        ease: Expo.easeOut
      })
      TweenLite.delayedCall(1,()=>{
        this.ceateBall();
      })
      return;
    }
    this._touchLayer.removeListener('tap',this.rotationBallBox,this);
    this._touchCount++;
    TweenLite.to(this._ballBox,0.5,{rotation:this.angleToRadian(180*(this._touchCount+1)),ease:Expo.easeOut,onComplete:()=>{
      this.reAddTapListener();
    }})
  }
  //角度转弧度
  private angleToRadian(angle:number):number{
    return angle*(Math.PI/180);
  }
  //弧度转角度
  private radianToAng(radian:number):number{
    return radian*(180/Math.PI);
  }

  private ceateBall():void{
    let targetBallColor = this._ballColorList[parseInt(this.rang(0,2).toString(),10)];
    if(Math.random() > 0.5){
      this._direction = 1;
    }else {
      this._direction = -1;
    }

    this._targetBall = new TargetBall(targetBallColor);
    if(this._direction == 1){
      this._targetBall.y = -30;
    }else {
      this._targetBall.y = this.renderer.height+30;
    }
    this._targetBall.x = (this.renderer.width - this._targetBall.width)/2 + 30;
    this.addChild(this._targetBall);

    //this.ticker.add(this.update,this);
  }

  private reAddTapListener():void{
    this._touchLayer.addListener('tap',this.rotationBallBox,this);
  }

  public update():void{
    if(!this._targetBall){
      return;
    }
    this._targetBall.y += (this._targetBallSpeed*this._direction);
    
  }

  public quit():void{
    this.stage.removeChild(this);
  }


}