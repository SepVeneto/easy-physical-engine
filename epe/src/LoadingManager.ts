export type ProgressCallback = (url: string, loaded: number, total: number) => void
export type ErrorCallback = (url: string) => void

class LoadingManager {
  public itemStart: (url: string) => void
  public itemEnd: (url: string) => void
  public itemError: (url: string) => void
  public resolveURL: (url: string) => string
  public setModifier: (transform: any) => void
  public onStart?: ProgressCallback
  public onLoad?: () => void
  public onProgress?: ProgressCallback
  public onError?: ErrorCallback

  constructor(onLoad?: () => void, onProgress?: ProgressCallback, onError?: ErrorCallback) {
    let isLoading = false
    let itemsLoaded = 0
    let itemsTotal = 0
    let urlModifier = undefined

    this.onStart = undefined
    this.onLoad = onLoad
    this.onProgress = onProgress
    this.onError = onError

    this.itemStart = (url) => {
      ++itemsTotal
      if (!isLoading && this.onStart) {
        this.onStart(url, itemsLoaded, itemsTotal)
      }
      isLoading = true
    }

    this.itemEnd = (url) => {
      ++itemsLoaded
      this.onProgress && this.onProgress(url, itemsLoaded, itemsTotal)
      if (itemsLoaded === itemsTotal) {
        isLoading = false
        this.onLoad && this.onLoad()
      }
    }

    this.itemError = (url) => {
      this.onError && this.onError(url)
    }

    this.resolveURL = (url) => {
      return urlModifier ? urlModifier(url) : url
    }

    this.setModifier = (transform) => {
      urlModifier = transform
    }
  }
}

const DefaultLoadingManager = new LoadingManager()
export { DefaultLoadingManager, LoadingManager }