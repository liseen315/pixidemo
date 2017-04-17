import 'pixi.js';
import Player from './core/player/Player';
import { IPlayerOption } from './core/interface/IPlayerOption';
import SceneManager from './SceneManager';
import LoadingScene from './LoadingScene';
import GameScene from './GameScene';
import EventConst from './EventConst';

class Main {
  private player: Player;
  private _sceneManager:SceneManager;
  private _loadingScene:LoadingScene;
  private _gameScene:GameScene;
  private loader:PIXI.loaders.Loader;
  
  constructor() {
    this.initPlayer();
    this.initScene();
  }
  private initPlayer(): void {
    let holder = document.getElementById('player-holder');
    this.player = Player.getInstance(holder as HTMLDivElement);
  }

  private initScene():void{
    this._sceneManager = new SceneManager();
    this._loadingScene = new LoadingScene(this.player);
    this._gameScene = new GameScene(this.player);
    this._sceneManager.addScene(this._loadingScene);
    this._sceneManager.addScene(this._gameScene);

    this._sceneManager.runScene(LoadingScene.NAME);
    this._loadingScene.once(EventConst.START_GAME,() => {
      this._loadingScene.removeAllListeners();
      this._sceneManager.runScene(GameScene.NAME);
    })

    this._gameScene.on(EventConst.GAME_OVER,()=>{
      console.log('gameOver change to overScene');
      
    })

  }
}

new Main();


