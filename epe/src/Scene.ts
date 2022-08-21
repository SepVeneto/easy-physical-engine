import { EPE } from ".";
import { DomInfo, RigidBody } from "./RigidBody";
export class Scene {
  canvas = EPE.canvas;
  ctx = EPE.ctx;
  public rigidBodys: RigidBody[] = [];
  public width: number
  public height: number
  constructor(canvasDom?: HTMLCanvasElement, domList?: DomInfo[]) {
    this.canvas = EPE.canvas
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = EPE.ctx
  }
  start() {
    this.render()
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    /**
     * TODO: collide
     */

    this.rigidBodys.forEach(item => {
      if (!item.pin) {
        item.y += 0.5
      }
      item.render()
    })
    requestAnimationFrame(() => this.render())
    // this.canvas.requestAnimationFrame(() => this.render())
  }
  add(object: RigidBody) {
    this.rigidBodys.push(object)
  }
}

