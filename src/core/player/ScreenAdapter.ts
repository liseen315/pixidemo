import StageScaleMode from './ScaleMode';

export interface StageDisplaySize {
  stageWidth: number;
  stageHeight: number;
  displayWidth: number;
  displayHeight: number;
}

export class ScreenAdapter {
  public constructor() {

  }
  public static calculateStageSize(scaleMode: string, screenWidth: number, screenHeight: number, contentWidth: number, contentHeight: number): StageDisplaySize {
    let displayWidth = screenWidth;
    let displayHeight = screenHeight;
    let stageWidth = contentWidth;
    let stageHeight = contentHeight;
    let scaleX = (screenWidth / stageWidth) || 0;
    let scaleY = (screenHeight / stageHeight) || 0;
    switch (scaleMode) {
      case StageScaleMode.EXACT_FIT:
        break;
      case StageScaleMode.NO_BORDER:
        if (scaleX > scaleY) {
          displayHeight = Math.round(stageHeight * scaleX);
        }
        else {
          displayWidth = Math.round(stageWidth * scaleY);
        }
        break;
      case StageScaleMode.SHOW_ALL:
        if (scaleX > scaleY) {
          displayWidth = Math.round(stageWidth * scaleY);
        }
        else {
          displayHeight = Math.round(stageHeight * scaleX);
        }
        break;
      default:
        stageWidth = screenWidth;
        stageHeight = screenHeight;
        break;
    }
    if (stageWidth % 2 != 0) {
      stageWidth += 1;
    }
    if (stageHeight % 2 != 0) {
      stageHeight += 1;
    }
    if (displayWidth % 2 != 0) {
      displayWidth += 1;
    }
    if (displayHeight % 2 != 0) {
      displayHeight += 1;
    }
    return {
      stageWidth: stageWidth,
      stageHeight: stageHeight,
      displayWidth: displayWidth,
      displayHeight: displayHeight
    };
  }
}