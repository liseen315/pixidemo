export default class HitTester {
  public static complexHitTestObject(target1: PIXI.DisplayObject, target2: PIXI.DisplayObject): Boolean {
    let isHit = false;
    let hitRect = HitTester.complexIntersectionRectangle(target1, target2) || new PIXI.Rectangle();
    if (hitRect.width < 1 || hitRect.height < 1) {
      isHit = false;
    } else {
      isHit = true;
    }
    return isHit;
  }

  public static complexIntersectionRectangle(target1: PIXI.DisplayObject, target2: PIXI.DisplayObject): PIXI.Rectangle {
    if(target1 == null || target2 == null){
      return;
    }
    let bounds1: PIXI.Rectangle = target1.getBounds();
    let bounds2: PIXI.Rectangle = target2.getBounds();
    let intersection: PIXI.Rectangle = new PIXI.Rectangle();
    intersection.x = Math.max(bounds1.x, bounds2.x);
    intersection.y = Math.max(bounds1.y, bounds2.y);
    intersection.width = Math.min((bounds1.x + bounds1.width) - intersection.x, (bounds2.x + bounds2.width) - intersection.x);
    intersection.height = Math.min((bounds1.y + bounds1.height) - intersection.y, (bounds2.y + bounds2.height) - intersection.y);
    return intersection;
  }
}