function linkedList () {
  let head = null
  let length = 0

  function get (position) {
    if (position >= length) throw new Error('Out of bounds!')

    let target = head

    for (let i = 0; i < position; i++) {
      if (!target.next) return null

      target = target.next
    }

    return target
  }

  function insert (position, value) {
    if (position > length) throw new Error('Insertion out of bounds!')
    if (position === 0) {
      head = { value, next: head }
    } else {
      const previousNode = get(position - 1)
      const nextNode = previousNode.next

      previousNode.next = { value, next: nextNode }
    }

    length++
  }

  function remove (position) {
    if (!head) throw new Error('Removing from an empty list!')

    if (position === 0) {
      head = head.next
    } else {
      const previousNode = get(position - 1)
      const targetNode = previousNode.next

      previousNode.next = targetNode.next
    }

    length--
  }

  function size () {
    return length
  }

  return {
    get,
    insert,
    remove,
    size
  }
}

module.exports = linkedList
