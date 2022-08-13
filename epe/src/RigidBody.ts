import { ImageLoader } from "./ImageLoader";
import { EPE } from ".";
export type DomInfo = {
  left: number
  top: number
  width: number
  height: number
}

export class RigidBody {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public pin: boolean;
  public image: HTMLImageElement

  constructor(info: DomInfo) {
    this.ctx = EPE.ctx
    this.x = info.left;
    this.y = info.top;
    this.width = info.width;
    this.pin = false;
    this.height = info.height;
  }
  render() {
    this.drawImage()
    // this.drawRect()
  }
  drawRect() {
    this.ctx.fillStyle = 'aqua'
    this.ctx.fillRect(this.x, this.y, 150, 1)
  }
  drawImage() {
    this.image && this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }
  setImage(url: string) {
    this.image  = new ImageLoader().load(url)
  }
}