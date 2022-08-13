import { DefaultLoadingManager, LoadingManager, ProgressCallback } from "./LoadingManager";

export class Loader {
  public manager: LoadingManager
  public crossOrigin: string
  private withCredentials: boolean
  public path: string
  private resourcePath: string
  private requestHeader: Record<string, any>

  constructor(manager?: LoadingManager) {
    this.manager = manager ? manager : DefaultLoadingManager

    this.crossOrigin = 'anonymous'
    this.withCredentials = false
    this.path = ''
    this.resourcePath = ''
    this.requestHeader = {}
  }
  load(
    url: string,
    resolve: (value: unknown) => void,
    onProgress: ProgressCallback,
    reject: ErrorCallback
  ){}
  loadPromise(url: string, onProgress: () => void) {
    return new Promise((resolve, reject) => {
      this.load(url, resolve, onProgress, reject)
    })
  }
}
