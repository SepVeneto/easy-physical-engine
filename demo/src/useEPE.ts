import { onMounted } from "vue";
import { EPE } from 'epe'

export function useEPE(dom: string, canvasDom: string) {
  onMounted(() => {
    const canvas: HTMLCanvasElement | null = document.querySelector(canvasDom)
    if (!canvas) {
      console.warn('找不到canvas')
      return;
    }
    canvas.width = document.body.offsetWidth
    canvas.height = document.body.offsetHeight
    const context = canvas.getContext('2d')
    if (!context) {
      console.warn('获取画布上下文失败')
      return;
    }
    EPE.registerCanvas(canvas, context)

    const scene = new EPE.Scene()

    const domList = document.querySelectorAll(dom)
    domList.forEach(node => {
      const rect = node.getBoundingClientRect()
      const rigid = new EPE.RigidBody(rect)
      scene.add(rigid)
    })

    const ball = new EPE.RigidBody({
      left: scene.width / 2 - 16,
      top: 0,
      width: 32,
      height: 32,
    })
    ball.setImage('/vite.svg')

    scene.add(ball)
    scene.start()
  })
}