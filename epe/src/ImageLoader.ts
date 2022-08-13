import { Loader } from './Loader';
import { _canvas } from './Canvas';
import { EPE } from './index'
import { LoadingManager, ProgressCallback } from './LoadingManager';
function createImage(): HTMLImageElement {
  return new Image()
  // return EPE.canvas.createImage()
}

export class ImageLoader extends Loader {
  constructor(manager?: LoadingManager) {
    super(manager)
  }

  load(
    url: string,
    onLoad?: (value?: unknown) => void,
    onProgress?: ProgressCallback,
    onError?: ErrorCallback
  ) {
    url = (this.path || '') +  url
    url = this.manager.resolveURL(url)

    // this.manager.itemStart(url)

    // onLoad && onLoad(url)
    // this.manager.itemEnd(url)

    // return 

    const image = createImage()

    const onImageLoad = () => {
      removeEventListener()
      onLoad && onLoad()
      this.manager.itemEnd(url)
    }

    const onImageError = (evt) => {
      removeEventListener()
      onError && onError(evt)
      this.manager.itemError(url)
      this.manager.itemEnd(url)
    }

    function removeEventListener() {
      image.removeEventListener('load', onImageLoad, false)
      image.removeEventListener('error', onImageError, false)
    }

    image.addEventListener('load', onImageLoad, false)
    image.addEventListener('error', onImageError, false)

    // 非Base64，添加跨域设置
    if (url.slice(0, 5) !== 'data:' && this.crossOrigin) {
      image.crossOrigin = this.crossOrigin
    }

    this.manager.itemStart(url)

    image.src = url

    return image
  }
}