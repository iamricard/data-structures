const linkedList = require('./linked-list')

function stack () {
  const list = linkedList()

  function isEmpty () {
    return list.size() === 0
  }

  function push (value) {
    list.insert(0, value)
  }

  function pop () {
    if (list.size() === 0) return

    const {value} = list.get(0)
    list.remove(0)

    return value
  }

  function peek () {
    return list.get(0).value
  }

  return {
    isEmpty,
    push,
    pop,
    peek
  }
}

module.exports = stack
