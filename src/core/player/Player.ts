import 'pixi.js'
import { IScreen } from '../interface/IScreen';
import { IPlayerOption } from '../interface/IPlayerOption';
import ScaleMode from './ScaleMode';
import OrientationMode from './OrientationMode';
import { ScreenAdapter, StageDisplaySize } from './ScreenAdapter';

export default class Player implements IScreen {
  private playerOption: IPlayerOption;
  private container: HTMLDivElement;
  public render: PIXI.SystemRenderer;
  public stage: PIXI.Container;
  public constructor(container: HTMLDivElement) {
    this.container = container;
    this.init(container);
    this.initOrientation();
  }

  private init(container: HTMLDivElement): void {
    this.playerOption = this.readOption(container);
    this.initRender();
    this.initStage();
    this.updateScreenSize();
    this.initResize();
  }

  private readOption(container: HTMLDivElement): IPlayerOption {
    let option: IPlayerOption = {} as IPlayerOption;
    option.contentWidth = Number(container.getAttribute('data-content-width')) || 480;
    option.contentHeight = Number(container.getAttribute('data-content-height')) || 800;
    option.orientation = String(container.getAttribute('data-orientation')) || OrientationMode.AUTO;
    option.scaleMode = String(container.getAttribute('data-scale-mode')) || ScaleMode.NO_SCALE;
    return option;
  }

  private initRender(): void {
    this.render = PIXI.autoDetectRenderer(this.playerOption.contentWidth, this.playerOption.contentHeight);
    this.render.autoResize = true;
    let style = this.render.view.style;
    style.cursor = "inherit";
    style.position = "absolute";
    style.top = "0";
    style.bottom = "0";
    style.left = "0";
    style.right = "0";
    this.container.appendChild(this.render.view);
    style = this.container.style;
    style.overflow = "hidden";
    style.position = "relative";
    style["webkitTransform"] = "translateZ(0)";
  }

  private initStage(): void {
    this.stage = new PIXI.Container();
  }

  private initOrientation(): void {
    window.addEventListener("orientationchange", () => {
      console.log('screen orientation change!');
    })
  }

  private initResize():void{
    window.addEventListener('resize',()=>{

    })
  }

  public updateScreenSize(): void {
    let screenRect = this.container.getBoundingClientRect();
    //console.log('screenRect',screenRect.width,screenRect.height);
    let shouldRotate: Boolean = false;

    let orientation: string = this.playerOption.orientation
    if (orientation != OrientationMode.AUTO) {
      shouldRotate = orientation != OrientationMode.PORTRAIT && screenRect.height > screenRect.width
        || orientation == OrientationMode.PORTRAIT && screenRect.width > screenRect.height;
    }

    let screenWidth = shouldRotate ? screenRect.height : screenRect.width;
    let screenHeight = shouldRotate ? screenRect.width : screenRect.height;
    let stageSize: StageDisplaySize = ScreenAdapter.calculateStageSize(this.playerOption.scaleMode, screenWidth, screenHeight, this.playerOption.contentWidth, this.playerOption.contentHeight);
    //console.log('updateScreenSize -> ',shouldRotate, screenRect.width, screenRect.height, stageSize.stageWidth, stageSize.stageHeight, stageSize.displayWidth, stageSize.displayHeight);
    if (this.render.view.width !== stageSize.stageWidth) {
      this.render.view.width = stageSize.stageWidth;
    }
    if (this.render.view.height !== stageSize.stageHeight) {
      this.render.view.height = stageSize.stageHeight;
    }

    this.render.view.style.width = stageSize.displayWidth + 'px';
    this.render.view.style.height = stageSize.displayHeight + 'px';
    if (shouldRotate) {

    } else {
      this.render.view.style.top = (screenRect.height - stageSize.displayHeight) / 2 + 'px';
      this.render.view.style.left = (screenRect.width - stageSize.displayWidth) / 2 + 'px';
    }
  }

  public run():void{
     this.render.render(this.stage);
  }

  public setContentSize(): void {

  }
}