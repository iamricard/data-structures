const linkedList = require('./linked-list')

function queue () {
  const list = linkedList()

  function isEmpty () {
    return list.size() === 0
  }

  function enqueue (value) {
    list.insert(list.size(), value)
  }

  function dequeue () {
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
    enqueue,
    dequeue,
    peek
  }
}

module.exports = queue
