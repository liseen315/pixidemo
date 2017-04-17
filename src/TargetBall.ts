export default class TargetBall extends PIXI.Graphics {
  private _color:number;
  public constructor(color:number){
    super()
    this._color = color;
    this.initBall(color);
  }

  public get color():number{
    return this._color;
  }
  protected initBall(color:number):void{
    this.beginFill(color);
    this.drawCircle(0,0,30);
    this.endFill();
  }
}