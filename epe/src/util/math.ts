import { angleToRadian, makeArray } from "./utils"

export interface Pos {
  x: number
  y: number
}

export class Vec2 implements Pos {
  public constructor(public x: number = 0, public y: number = 0) {}

  public static MakeArray(length: number): Vec2[] {
    return makeArray(length, () => new Vec2())
  }

  public copy(other: Pos) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  public set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  public setZero() {
    this.x = 0
    this.y = 0
    return this;
  }
}

export class Rot {
  public sin: number = 0;
  public cos: number = 1;

  constructor(angle: number = 0) {
    if (angle) {
      const radian = angleToRadian(angle)
      this.sin = Math.sin(radian)
      this.cos = Math.cos(radian)
    }
  }
  public static MulRv<T extends Pos>(rot: Rot, v: Pos, out: T) {
    const { cos, sin } = rot
    const { x, y } = v
    out.x = cos * x - sin * y;
    out.y = sin * x + cos * y;
    return out;
  }
  public copy(other: Rot) {
    this.sin = other.sin;
    this.cos = other.cos;
    return this;
  }
  public setAngle(angle: number) {
    const radian = angleToRadian(angle)
    this.sin = Math.sin(radian)
    this.cos = Math.cos(radian)
    return this
  }
}

export class Transform {
  public readonly pos: Vec2 = new Vec2();
  public readonly rot: Rot = new Rot();

  public static MulPos<T extends Pos>(t: Transform, v: Pos, out: T) {
    const { cos, sin } = t.rot
    const { x, y } = v
    out.x = cos * x - sin * y + t.pos.x;
    out.y = sin * x + cos * y + t.pos.y;
    return out
  }
 
  public setPos(pos: Pos) {
    this.pos.copy(pos)
    return this;
  }
  public setAngle(angle: number) {
    this.rot.setAngle(angle)
    return this;
  }
  public setRot(rot: Rot) {
    this.rot.copy(rot)
    return this;
  }
  public setPosRot(pos: Pos, rot: Readonly<Rot>) {
    this.setPos(pos)
    this.setRot(rot)
    return this;
  }
  public setPosAng(pos: Pos, angle: number) {
    this.setPos(pos)
    this.setAngle(angle)
    return this;
  }
}