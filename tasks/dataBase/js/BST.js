import { Node } from './nodeForBST.js'

class BinarySearchTree {
  constructor() {
    this.root = null
    this.values = {}
  }

  roo() {
    return this.root
  }

  insert(key, value) {
    const newNode = new Node(key, value)

    if (!this.root) {
      this.root = newNode
      this.values[newNode.value] = newNode.key
      return this
    }

    let currentNode = this.root

    while (currentNode) {
      if (key > currentNode.key) {
        if (currentNode.right) {
          currentNode = currentNode.right
        } else {
          currentNode.right = newNode
          newNode.parentNode = currentNode
          this.values[newNode.value] = newNode.key
          break
        }
      } else if (currentNode.left) {
        currentNode = currentNode.left
      } else {
        currentNode.left = newNode
        newNode.parentNode = currentNode
        this.values[newNode.value] = newNode.key
        break
      }
    }
    return this
  }

  delete(key) {
    const removableNode = this.search(key)

    if (!removableNode) {
      return this
    }

    delete this.values[removableNode.value]

    const { right, left } = removableNode

    if (removableNode !== this.root) {
      if (removableNode.parentNode.left === removableNode) {
        removableNode.parentNode.left = null
      } else {
        removableNode.parentNode.right = null
      }
    } else {
      if (right > left) {
        this.root = left
        this.insert(right.key, right.value)
      } else {
        this.root = right
        this.insert(left.key, left.value)
      }
      return removableNode
    }

    if (right) {
      this.insert(right.key, right.value)
    }

    if (left) {
      this.insert(left.key, left.value)
    }

    return this
  }

  search(key) {
    let currentNode = this.root
    while (currentNode) {
      if (currentNode.key === key) {
        break
      }

      if (key > currentNode.key) {
        currentNode = currentNode.right
      } else {
        currentNode = currentNode.left
      }
    }
    return currentNode
  }

  contains(value) {
    return Boolean(this.values[value])
  }

  traverse(order = true) {
    const allKeys = []

    function inOrder(node) {
      if (!node) {
        return
      }

      if (order) {
        inOrder(node.left)
        allKeys.push(node.key)
        inOrder(node.right)
      } else {
        inOrder(node.right)
        allKeys.push(node.key)
        inOrder(node.left)
      }
    }

    inOrder(this.root)
    return allKeys
  }

  verify() {
    const allKeys = this.traverse()
    let treeIsValid = false

    if (allKeys.length < 2) {
      return treeIsValid
    }

    for (let i = 0; i < allKeys.length; i += 1) {
      if (allKeys[i] > allKeys[i + 1]) {
        break
      } else {
        treeIsValid = true
      }
    }
    return treeIsValid
  }
}

const bst = new BinarySearchTree()

bst.insert(2, 'two')
  .insert(1, 'one')
  .insert(3, 'three')

// ---2----
// 1-----3-
// --------

console.log(bst.roo()) // 'two'

bst.delete(1)
  .delete(3)

// ---2----
// ---------
// ----------

console.log(bst.roo()) // 'two'

bst.insert(1, 'one')
bst.insert(3, 'three')

// ---2----
// 1-----3-
// --------

console.log(bst.search(1)) // 'one'
console.log(bst.contains('three'))// true
console.log(bst.root)
console.log(bst.traverse(true)) // ['one', 'two', 'three']
console.log(bst.traverse(false)) // ['three', 'two', 'one']

bst.root.key = 0
console.log(bst.verify()) // false

// bst.insert(2, 333)
// bst.insert(0, 'w')
// bst.insert(5, 'e')
// bst.insert(4, 'g')
// bst.insert(1, 'f')
// bst.insert(6, 'n')
// // bst.delete(6)
// // console.log(bst.values)
// console.log(bst.verify())
