function Node () {
  const children = new Map()
  let endOfWord = false

  function setEndOfWord (isEnd) {
    endOfWord = isEnd
  }

  function insert ([head, ...tail]) {
    const nextNode = children.get(head) || Node()

    if (!tail.length) {
      nextNode.setEndOfWord(true)
    } else {
      nextNode.insert(tail)
    }

    children.set(head, nextNode)
  }

  function count () {
    let count = endOfWord ? 1 : 0

    const cs = children.values()
    let next = cs.next()

    while (!next.done) {
      count = count + next.value.count()
      next = cs.next()
    }

    return count
  }

  function partial ([c, ...cs]) {
    if (!children.has(c)) throw new Error('No such substring!')
    if (!cs.length) return children.get(c)

    return children.get(c).partial(cs)
  }

  return { count, insert, partial, setEndOfWord }
}

function Trie () {
  const head = Node()

  return { insert: head.insert, count: head.count, partial: head.partial }
}

module.exports = Trie
