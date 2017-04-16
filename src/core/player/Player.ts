import 'pixi.js'
import { IPlayerOption } from '../interface/IPlayerOption';
import ScaleMode from './ScaleMode';
import OrientationMode from './OrientationMode';
import { ScreenAdapter, StageDisplaySize } from './ScreenAdapter';

export default class Player extends PIXI.Application  {
  public static _instance: Player;
  private _playerOption: IPlayerOption;
  private _holder: HTMLDivElement;
  private _shouldRotate:Boolean = false;

  public constructor(holder: HTMLDivElement) {
    super();
    this._holder = holder;
    this.init();
  }

  public static getInstance(holder: HTMLDivElement): Player {
    if (Player._instance == null) {
      Player._instance = new Player(holder);
    }
    return Player._instance;
  }

  private init(): void {
    this._playerOption = this.readOption(this._holder);
    this.initView();
    this.addEventListeners();
    this.updateScreenSize();
  }

  private readOption(hd: HTMLDivElement): IPlayerOption {
    let option: IPlayerOption = {} as IPlayerOption;
    option.contentWidth = Number(hd.getAttribute('data-content-width')) || 480;
    option.contentHeight = Number(hd.getAttribute('data-content-height')) || 800;
    option.orientation = String(hd.getAttribute('data-orientation')) || OrientationMode.AUTO;
    option.scaleMode = String(hd.getAttribute('data-scale-mode')) || ScaleMode.SHOW_ALL;
    return option;
  }

  private initView(): void {
    this.renderer.resize(this._playerOption.contentWidth, this._playerOption.contentHeight);
    this.renderer.autoResize = true;
    let style = this.view.style;
    style.cursor = "inherit";
    style.position = "absolute";
    style.top = "0";
    style.bottom = "0";
    style.left = "0";
    style.right = "0";
    this._holder.appendChild(this.view);
    style = this._holder.style;
    style.overflow = "hidden";
    style.position = "relative";
    style["webkitTransform"] = "translateZ(0)";
  }

  private addEventListeners(): void {
    window.addEventListener('resize', () => {
      this.updateScreenSize();
    })
  }

  private updateScreenSize(): void {
    let screenRect = this._holder.getBoundingClientRect();
    let orientation: string = this._playerOption.orientation
    if (orientation != OrientationMode.AUTO) {
      this._shouldRotate = orientation != OrientationMode.PORTRAIT && screenRect.height > screenRect.width
        || orientation == OrientationMode.PORTRAIT && screenRect.width > screenRect.height;
    }
    let screenWidth = this._shouldRotate ? screenRect.height : screenRect.width;
    let screenHeight = this._shouldRotate ? screenRect.width : screenRect.height;
    let stageSize: StageDisplaySize = ScreenAdapter.calculateStageSize(this._playerOption.scaleMode, screenWidth, screenHeight, this._playerOption.contentWidth, this._playerOption.contentHeight);
    if (this.view.width !== stageSize.stageWidth) {
      this.view.width = stageSize.stageWidth;
    }
    if (this.view.height !== stageSize.stageHeight) {
      this.view.height = stageSize.stageHeight;
    }

    this.view.style.width = stageSize.displayWidth + 'px';
    this.view.style.height = stageSize.displayHeight + 'px';
    let rotation = 0;
    if (this._shouldRotate) {
      if (orientation == OrientationMode.LANDSCAPE) {
        rotation = 90;
        this.view.style.top = (screenRect.height - stageSize.displayWidth) / 2 + "px";
        this.view.style.left = (screenRect.width + stageSize.displayHeight) / 2 + "px";
      }
      else {
        rotation = -90;
        this.view.style.top = (screenRect.height + stageSize.displayWidth) / 2 + "px";
        this.view.style.left = (screenRect.width - stageSize.displayHeight) / 2 + "px";
      }
    } else {
      this.view.style.top = (screenRect.height - stageSize.displayHeight) / 2 + 'px';
      this.view.style.left = (screenRect.width - stageSize.displayWidth) / 2 + 'px';
    }
  }

  public get playOption(): IPlayerOption {
    return this._playerOption;
  }
}