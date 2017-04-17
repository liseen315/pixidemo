import TargetBall from './TargetBall';

export default class ShadowBall extends TargetBall {
  private _ticker:PIXI.ticker.Ticker;
  public constructor(color: number) {
    super(color)
    this._ticker = new PIXI.ticker.Ticker();
    this._ticker.add(this.scaleBall,this);
    this._ticker.start();
  }

  protected initBall(): void {
    this.beginFill(this.color);
    this.drawCircle(0, 0, 30);
    this.endFill();
  }

  private scaleBall():void{
    this.scale.x *= 1.25;
    this.scale.y *= 1.25;
    this.alpha -= 0.1;
    if(this.alpha <= 0){
      this._ticker.stop();
      this._ticker.remove(this.scaleBall,this);
      this._ticker = null;
      if(this.parent){
        this.parent.removeChild(this);
      }
    }
  }

}