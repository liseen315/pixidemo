/**
 * 在html的canvas内有两个width height 属性,分别是自己的width已经style.width
 * 其中width代表画布本身的大小也就是你实际的画布区域大小,而style.width是渲染到浏览器内的尺寸
 * 
 * noScale  将保持原始1：1显示，也就是width,height与style.width,style.height同样宽高,当浏览器缩放的时候会进行宽以及高上的裁剪
 * showAll  保持内容宽高比不变,并显示全部,会计算显示与内容的宽高比,最终使用宽高比小的一方撑满,另外一方会产生黑边.因为当前我们的设计分辨率
 *          采用了640*1136的选择会保证大部分的机型得到适配
 * noBorder 同样会计算设计分辨率与屏幕分辨率宽高比,会选择宽高比大的一方(窄的)一方全填充满，另外一方两侧可能会超出显示区被裁剪.
 * exactFit 这种模式会是的内容宽高与屏幕宽高完全一致,也就是渲染宽高会完全等于浏览器的宽高,会暴力拉伸内容，一般不建议使用.
 * fixedWidth 这种模式会保持内容宽度不变,高度可能会改变,宽高都填充满屏幕.
 * fixedHeight 这种模式会保持内容高度不变,宽度可能会改变,宽高都填充满屏幕.
 * fixedNarrow 这种模式会导致画布宽高有所改变,会选择高度填满,宽度不够的可能会填充黑边.
 */
export default class ScaleMode {
  
  public static NO_SCALE: string = "noScale";
  public static SHOW_ALL: string = "showAll";
  public static NO_BORDER: string = "noBorder";
  public static EXACT_FIT: string = "exactFit";
  public static FIXED_WIDTH: string = "fixedWidth";
  public static FIXED_HEIGHT: string = "fixedHeight";
  public static FIXED_NARROW: string = "fixedNarrow";
} 