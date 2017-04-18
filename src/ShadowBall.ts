import TargetBall from './TargetBall';

export default class ShadowBall extends TargetBall {
  private _ticker:PIXI.ticker.Ticker;
  public constructor(color: number) {
    super(color)
  }

  protected initBall(): void {
    this.beginFill(this.color);
    this.drawCircle(0, 0, 30);
    this.endFill();
  }

  public update():void{
    this.scale.x *= 1.25;
    this.scale.y *= 1.25;
    this.alpha -= 0.1;
    if(this.alpha <= 0){
      if(this.parent){
        this.parent.removeChild(this);
      }
    }
  }

}