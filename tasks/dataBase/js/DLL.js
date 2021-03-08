import { Node } from './nodeForDLL.js'

class DoubleLinkedList {
  constructor() {
    this.head = null
    this.tailNode = null
  }

  hea() {
    return this.head
  }

  tail() {
    return this.tailNode
  }

  traverse(order = true) {
    const values = []

    if (!this.head) {
      return values
    }

    if (order) {
      let currentNode = this.head

      values.push(currentNode.data)

      while (currentNode.next) {
        values.push(currentNode.next.data)
        currentNode = currentNode.next
      }
    } else {
      let currentNode = this.tailNode

      values.push(currentNode.data)

      while (currentNode.previous) {
        values.push(currentNode.previous.data)
        currentNode = currentNode.previous
      }
    }

    return values
  }

  add(data) {
    const node = new Node(data)

    if (!this.head) {
      this.head = node
      return this
    }

    let currentNode = this.head
    while (currentNode.next) {
      currentNode = currentNode.next
    }

    currentNode.next = node
    node.previous = currentNode
    this.tailNode = node

    return this
  }

  getNode(value) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while (currentNode.next) {
      if (currentNode.data === value) {
        break
      } else {
        currentNode = currentNode.next
      }
    }

    return currentNode.data === value ? currentNode : null
  }

  addAfter(value, parentNode) {
    const parent = parentNode
    if (!this.head) {
      return
    }

    const node = new Node(value)

    node.next = parent.next
    node.previous = parent

    if (parent.next) {
      parent.next.previous = node
    }

    parent.next = node

    if (!node.next) {
      this.tailNode = node
    }
  }

  delete(value) {
    const removableNode = this.getNode(value)

    if (!removableNode) {
      return this
    }

    if (removableNode.previous) {
      removableNode.previous.next = removableNode.next
    } else {
      this.head = removableNode.next
    }

    if (removableNode.next) {
      removableNode.next.previous = removableNode.previous
    } else {
      this.tailNode = removableNode.previous
    }

    return this
  }

  isExist(value) {
    return Boolean(this.getNode(value))
  }
}

const dll = new DoubleLinkedList()

dll.add('two')
  .add('one')
  .add('three')
  .add('four')
console.log(dll.traverse()) // two -> one -> three -> four
console.log(dll.traverse(true)) // two -> one -> three -> four
console.log(dll.traverse(false)) // four -> three -> one -> two

console.log(dll.hea()) // Node with value === 'two'
console.log(dll.tail()) // Node with value === 'four'

const parentNode = dll.getNode('one')
dll.addAfter('ten', parentNode)
console.log(dll.traverse()) // two -> one -> ten -> three -> four

dll.delete('one')
  .delete('three')
console.log(dll.traverse()) // two -> ten -> four

console.log(dll.isExist('ten')) // true
console.log(dll.isExist('one')) // false
