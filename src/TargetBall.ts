export default class TargetBall extends PIXI.Graphics {
  public constructor(color:number){
    super()
    this.initBall(color);
  }

  private initBall(color:number):void{
    this.beginFill(color);
    this.drawCircle(0,0,30);
    this.endFill();
    this.hitArea = new PIXI.Rectangle(0,0,60,60);
  }
}