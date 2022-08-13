import { RigidBody } from "./RigidBody"
import { Scene } from "./Scene";
export const EPE = {
  canvas: null,
  ctx: null,
  RigidBody,
  Scene,
  registerCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    EPE.canvas = canvas;
    EPE.ctx = ctx
  }
}