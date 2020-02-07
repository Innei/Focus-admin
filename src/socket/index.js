import { getToken } from '@/utils/auth'
const ws = new WebSocket('ws://localhost:3000/gateway')
ws.onopen = e => {
  console.log('[ws] connected.')

  // ws.send(
  //   JSON.stringify({
  //     type: 'auth',
  //     token: JSON.parse(getToken() || {}).token
  //   })
  // )
}
