// @flow

function heap (compare /* : 'max' | 'min' */ = 'max', startingHeap /* : Array<number> */ = []) {
  const memory = startingHeap

  function maxCompare (x, y) {
    return x > y
  }

  function minCompare (x, y) {
    return x < y
  }

  const compareFn = compare === 'max' ? maxCompare : minCompare

  // Needs integer division
  const parentIndex = (i) => Math.floor((i - 1) / 2)
  const leftChildIndex = (i) => (i * 2) + 1
  const rightChildIndex = (i) => (i * 2) + 2
  const parent = (i) => memory[parentIndex(i)]
  const leftChild = (i) => memory[leftChildIndex(i)]
  const rightChild = (i) => memory[rightChildIndex(i)]
  const hasParent = (i) => parentIndex(i) >= 0
  const hasLeftChild = (i) => leftChildIndex(i) < memory.length
  const hasRightChild = (i) => rightChildIndex(i) < memory.length

  function swap (i1, i2) {
    const tmp = memory[i1]
    memory[i1] = memory[i2]
    memory[i2] = tmp
  }

  function add (value/* : number */) {
    memory.push(value)

    if (memory.length > 0) siftUp()
  }

  function peek () {
    return memory[0]
  }

  function poll () {
    const top = memory[0]
    memory[0] = memory.pop()
    siftDown()
    return top
  }

  function siftDown (start = 0) {
    if (!hasLeftChild(start) && !hasRightChild(start)) return

    if (!rightChild(start) || compareFn(leftChild(start), rightChild(start))) {
      if (compareFn(memory[start], leftChild(start))) return
      swap(leftChildIndex(start), start)
      siftDown(leftChildIndex(start))
    } else {
      if (compareFn(memory[start], rightChild(start))) return
      swap(rightChildIndex(start), start)
      siftDown(rightChildIndex(start))
    }
  }

  function siftUp (start = memory.length - 1) {
    if (compareFn(memory[start], parent(start))) {
      swap(start, parentIndex(start))

      if (hasParent(start)) siftUp(parentIndex(start))
    }
  }

  function size () {
    return memory.length
  }

  function toString () {
    return `${compare} Heap { ${memory.join(', ')} }`
  }

  return {
    add, // Adds new element to the heap
    peek, // Returns top element of the heap
    poll, // Pops and returns top element of the heap
    size,
    toString
  }
}

module.exports = heap
