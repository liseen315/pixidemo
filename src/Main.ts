import Player from './core/player/Player';
import {IPlayerOption} from './core/interface/IPlayerOption';
class Main {
  private player: Player;
  constructor() {
    
  }
  public initPlayer():void{
    let list = document.querySelectorAll(".player");
    let length = list.length;
    for (let i = 0; i < length; i++) {
      let container = <HTMLDivElement>list[i];
      let player = new Player(container);
    }
  }
}

let main: Main = new Main();
main.initPlayer();


