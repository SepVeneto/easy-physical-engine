import { Pos, Transform, Vec2, Rot } from "../util/math";
import { Box } from "./Box";
export class PolygonBox extends Box {
  public readonly centorid: Vec2 = new Vec2(0, 0)
  /** 顶点坐标 */
  public vertices: Vec2[] = []
  /** 顶点数 */
  public count: number = 0
  /** 法线 */
  public normals: Vec2[] = []

  constructor() {
    super()
  }

  public setAsRect(hx: number, hy: number, center?: Pos, angle: number = 0) {
    this.count = 4;
    this.vertices = Vec2.MakeArray(this.count)
    this.vertices[0].set(-hx, -hy)
    this.vertices[1].set(-hx, hy)
    this.vertices[2].set(hx, hy)
    this.vertices[3].set(hx, -hy)
    this.normals = Vec2.MakeArray(this.count)
    this.normals[0].set(0, -1)
    this.normals[1].set(1,  0)
    this.normals[2].set(0, 1)
    this.normals[3].set(-1, 0)
    this.centorid.setZero()

    /** 根据质心和角度旋转 */
    if (center) {
      this.centorid.copy(center)

      const tf = new Transform()
      tf.setPosAng(center, angle)

      for (let i = 0; i < this.count; ++i) {
        this.vertices[i] = Transform.MulPos(tf, this.vertices[i], this.vertices[i])
        this.normals[i] = Rot.MulRv(tf.rot, this.normals[i], this.normals[i])
      }
    }
    return this;
  }

  // public computeDistance(tf: Transform, )
}
