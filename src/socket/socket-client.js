// // import { getToken } from '@/utils/auth'
import { notification } from 'ant-design-vue'

const Message = {
  info: notification.info,
  error: notification.error,
  success: notification.success,
  warn: notification.warn,
  warning: notification.warning,
  loading: notification.loading
}
class SocketClient {
  static retryDelay(times) {
    switch (times) {
      case 0: {
        return 500
      }
      case 1: {
        return 1000
      }
      case 2: {
        return 3000
      }
      case 3:
      case 4:
      case 5: {
        return 5000
      }
      default: {
        return 10000
      }
    }
  }

  constructor() {
    this.ws = new WebSocket('ws://localhost:3000/gateway')
    this._retryCount = 0
    this._reconnecting = false
    window.addEventListener('online', () => {
      this._onOnline()
    })
    window.addEventListener('offline', () => {
      this._onOffline()
    })
    this.ws.onopen = this._onOpen.bind(this)
    this.ws.onclose = this._onClose.bind(this)
    this.ws.onerror = this._onError.bind(this)
    this.ws.onmessage = this._onMessage.bind(this)
  }

  open(url = this.ws.url) {
    if (this.state !== SocketClient.CLOSED) {
      return
    }
    this._connect(url)
  }

  close(code, reason) {
    if (this.state !== SocketClient.CLOSED) {
      this._reconnecting = false
      this._close(code, reason)
    }
  }

  send(data) {
    if (this.state !== SocketClient.OPEN) {
      return
    }
    this.ws.send(JSON.stringify(data))
  }

  get url() {
    return this.ws && this.ws.url
  }

  get online() {
    return navigator.onLine
  }

  get state() {
    if (!this.ws) {
      return SocketClient.CLOSED
    }
    switch (this.ws.readyState) {
      case WebSocket.CONNECTING: {
        return this.retryCount === 0
          ? SocketClient.CONNECTING
          : SocketClient.RECONNECTING
      }
      case WebSocket.OPEN: {
        return SocketClient.OPEN
      }
      case WebSocket.CLOSING: {
        return SocketClient.CLOSING
      }
      case WebSocket.CLOSED: {
        return SocketClient.CLOSED
      }
      default: {
        return SocketClient.CLOSED
      }
    }
  }
  _connect(url = this.url) {
    this.ws = new WebSocket(url)
    this.ws.onopen = this._onOpen.bind(this)
    this.ws.onclose = this._onClose.bind(this)
    this.ws.onerror = this._onError.bind(this)
    this.ws.onmessage = this._onMessage.bind(this)
  }
  _reconnect(url = this.url) {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer)
    }
    this._reconnecting = true
    this._reconnectTimer = setTimeout(() => {
      this._retryCount += 1
      console.log(`[ws] reconnect ${this._retryCount} times`)
      if (this.online) {
        this._connect(url)
      }
    }, this.constructor.retryDelay(this._retryCount))
  }

  _close(code, reason) {
    this.ws.close(code, reason)
  }

  _stopReconnect() {
    if (this._reconnectTimer) {
      clearTimeout(this._reconnectTimer)
      this._reconnectTimer = 0
    }
  }

  _onOpen(event) {
    console.log(`[ws] open`)
    this._retryCount = 0
    this._reconnecting = false
    this._stopReconnect()
  }

  _onClose(event) {
    console.log(`[ws] close`)
    let reason
    if (event.reason) {
      try {
        const data = JSON.parse(event.reason)
        reason = data.reason
      } catch (err) {
        reason = event.reason
      }
    }
    switch (event.code) {
      case 1006: {
        this._reconnect(this.url)
        break
      }
      default:
        break
    }
    console.log('close')
  }

  _onMessage(event) {
    const { data } = event
    // console.log(data);
    try {
      const { type, message } = JSON.parse(data)
      Message[type]({
        message: 'Notice',
        description: message
      })
    } catch (err) {
      console.log(err)
    }
  }

  _onError(event) {
    console.error(`[ws] error`)

    console.log(event)
  }

  _onOnline() {
    console.log(`[ws] online`)
    if (this._reconnecting && this.state !== SocketClient.OPEN) {
      this._connect(this.url)
    }
  }

  _onOffline() {
    console.log(`[ws] offline`)
    this._reconnecting = true
    this._stopReconnect()
  }
}

Object.defineProperty(SocketClient, 'CONNECTING', {
  value: 0,
  writable: false,
  enumerable: false,
  configurable: false
})
Object.defineProperty(SocketClient, 'OPEN', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false
})
Object.defineProperty(SocketClient, 'CLOSING', {
  value: 2,
  writable: false,
  enumerable: false,
  configurable: false
})
Object.defineProperty(SocketClient, 'CLOSED', {
  value: 3,
  writable: false,
  enumerable: false,
  configurable: false
})
Object.defineProperty(SocketClient, 'RECONNECTING', {
  value: 4,
  writable: false,
  enumerable: false,
  configurable: false
})

export default SocketClient
