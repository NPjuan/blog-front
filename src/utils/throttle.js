/**
 *  节流函数
 *
 *  @param {Function} callback 回调函数
 *  @param {Number}   delay    延迟时间
 *  @param {Boolean}  atBegin  是否第一次触发就执行
 */

module.exports = function (callback, delay, atBegin = false) {
  // 定时器
  let timeoutID
  // 最后一次执行的时间
  let lastExec = Number(new Date())
  function wrapper () {
    let self = this
    let elapsed = Number(new Date()) - lastExec
    let args = arguments
    // 执行器
    function exec() {
      lastExec = Number(new Date())
      callback.apply(self, args)
    }
    // 如果 atBegin 为 true 并且为第一次执行，直接执行一次
    if ( atBegin && !timeoutID ) {
      exec()
    }
    // 每次都清除一次定时器，然后再次设置
    clearTimeout(timeoutID)
    // 无论是否到达执行时刻，都要保证执行时刻的正确执行
    if ( atBegin && elapsed > delay ) {
      exec()
    } else {
      timeoutID = setTimeout(exec, delay-elapsed)
    }
  }

  return wrapper
}
