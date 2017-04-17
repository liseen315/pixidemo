import BaseScene from './BaseScene';
export default class SceneManager {
  private _currentRunScene:BaseScene;
  private _sceneList:Array<BaseScene> = [];
  public constructor(){

  }

  public addScene(s:BaseScene):void{
    this._sceneList.push(s);
  }

  public getCurrentScene():BaseScene{
    return this._currentRunScene;
  }

  public runScene(sName:string):BaseScene{
    if(this._currentRunScene != null){
      this._currentRunScene.quit();
    }
    let index = 0;
    for(index;index< this._sceneList.length;index++){
      if(this._sceneList[index].name == sName){
        this._currentRunScene = this._sceneList[index];
        break;
      }
    }
    this._currentRunScene.render();
    return this._currentRunScene;
  }

}