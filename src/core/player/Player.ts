import { IScreen } from '../interface/IScreen';
import { IPlayerOption } from '../interface/IPlayerOption';
import ScaleMode from './ScaleMode';
import OrientationMode from './OrientationMode';


export default class Player implements IScreen {
  private playerOption: IPlayerOption;
  private container: HTMLDivElement;
  public constructor(container: HTMLDivElement) {
    this.container = container;
    this.init(container);
    this.initOrientation();
  }

  private init(container: HTMLDivElement): void {
    this.playerOption = this.readOption(container);
    this.updateScreenSize();
  }

  private readOption(container: HTMLDivElement): IPlayerOption {
    let option: IPlayerOption = {} as IPlayerOption;
    option.contentHeight = Number(container.getAttribute('data-content-height')) || 800;
    option.contentWidth = Number(container.getAttribute('data-content-width')) || 480;
    option.orientation = String(container.getAttribute('data-orientation')) || OrientationMode.AUTO;
    option.scaleMode = String(container.getAttribute('data-scale-mode')) || ScaleMode.NO_SCALE;
    return option;
  }

  private initOrientation(): void {
    window.addEventListener("orientationchange", () => {
      console.log('screen orientation change!');
    })
  }

  public updateScreenSize(): void {
    let screenRect = this.container.getBoundingClientRect();
    let shouldRotate: Boolean = false;

  }

  public setContentSize(): void {

  }
}