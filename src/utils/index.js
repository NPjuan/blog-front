export function deconstruct(self, resObj) {
  for (let item in resObj) {
    if (item in self.$data) {
      self[item] = resObj[item]
    }
  }
}

