const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING
    // 是 null 的原因是用来区分 undefined
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      // 如果传递的是 promise 的话，则根据promise
      if (value instanceof MyPromise) {
        return value.then(resolve, reject)
      }

      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = FULFILLED
          this.value = value
          // forEach不一定能保证执行的顺序
          this.onFulfilledCallbacks.map(cb => cb(this.value))
        }
      })
    }

    const reject = reason => {
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED
          this.reason = reason
          this.onRejectedCallbacks.map(cb => cb(this.reason))
        }
      })
    }
    // 尝试执行
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  // then 方法做 2 件事，执行或配置相应的回调函数，决定 promise 2 的状态
  then(onFulfilled, onRejected) {
    // 返回一个 新的promise，称为 promise2
    let promise2
    // 配置项应当为函数，如果不是就帮他转换
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
    onRejected = typeof onRejected === "function" ? onRejected : reason => {
      throw reason
    }

    if (this.state === FULFILLED) {
      // 如果状态已经凝固，直接执行配置函数而不放入回调函数数组
      // 这种情况在已经将主函数全部执行过一次的情况下，再去配置的时候发生
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }))
    }
    if (this.state === REJECTED) {
      return (promise2 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }))
    }
    if (this.state === PENDING) {
      return (promise2 = new MyPromise((resolve, reject) => {
        // 配置回调函数
        this.onFulfilledCallbacks.push(value => {
          // 如果 onFulfilled 或 决定 promise2 的状态发生异常，抛出错误
          try {
            let x = onFulfilled(value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })

        this.onRejectedCallbacks.push(reason => {
          try {
            let x = onRejected(reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }))
    }
  }
}

// resolvePromise用于解决 then 方法返回的 promise 的状态
function resolvePromise(promise2, x, resolve, reject) {
  // 如果 onFulfilled 放回的是 promise2
  if (promise2 === x) {
    reject(new TypeError('循环引用'))
  }
  // 如果 x 为promise 则工具x的状态来改变
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      // 这个 y 也有可能是 promise 需要一直递归调用
      x.then(
        y => {
          resolvePromise(promise2, y, resolve, reject)
        },
        reason => {
          reject(reason)
        })
    } else {
      // 通过 then 一次判断两种状态
      x.then(resolve, reject)
    }
  } else if (x && (typeof x === "function" || typeof x === 'object')) {
    let used = false
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (used) return
            used = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if (used) return
            used = true
            reject(r)
          })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (used) return
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
export { MyPromise }
// MyPromise.deferred = function() {
//   let defer = {};
//   defer.promise = new MyPromise((resolve, reject) => {
//     defer.resolve = resolve;
//     defer.reject = reject;
//   });
//   return defer;
// };
//
// module.exports = MyPromise;




/**
 *  resolve, reject 只做 3 件事
 *  改变 promise 状态
 *  保存 value/reason 结果
 *  执行 onFulfilled/onRejected 回调函数
 *  tips:
 *   - 是放入 event-loop 中执行
 *   - 如果保存的结果是 newPromise 则根据该 newPromise 来决定
 */
/**
 * then 只做 3 件事
 * 返回一个 promise2
 * 执行或配置相应的回调函数
 * 通过 resolvePromise 来确定 promise2 的状态
 * tips: promise2 的状态最终一定会被改变
 */
/**
 * resolvePromise
 * 分析 then 方法配置的回调函数的返回值 x 来决定 promise2 的状态
 * 如果 x === promise2，扔出循环引用的错误
 * 如果 x 带有 then 方法，也就是 为 thenable  对象
 *  - 可能为 promise
 *  - 可能是函数或对象
 * 调用 x 的 then 方法来决定 promise2 的状态
 *  - 如果 resolve/reject 方法返回的还是 thenable 对象，则递归调用执行它的 then 方法
 * 如果 x 为普通值，返回 resolve 状态的 promise2
 */
