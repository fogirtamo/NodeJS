import EventEmitter from 'events'

const emitter = new EventEmitter()
// emitter.on('any', data => {         // вешаем слушатель событий
//     console.log('ON: any', data)
// })

// emitter.emit('any', {a: 1})         // искусственно создаем событие  
// emitter.emit('any', {a: 2})         // искусственно создаем событие  

// setTimeout(() => {
//     emitter.emit('any', {c: 3})
// }, 1500)

class Dispatcher extends EventEmitter {
    subscribe(eventName, cb) {             //подписка на событие
      console.log('[Subscribe...]')
      this.on(eventName, cb)
    }
  
    dispatch(eventName, data) {            //отправка
      console.log('[Dispatching...]')
      this.emit(eventName, data)
    }
  }
  
  const dis = new Dispatcher()
  
  dis.subscribe('aa', data => {
    console.log('ON: aa', data)
  })
  
  dis.dispatch('aa', {aa: 22})