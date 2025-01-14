import { editableNode } from './editableNode.js'

/** Gets the editable node immediately after the node of the given path. */
export const nextEditable = path => {
  const editable = path && editableNode(path)
  const child = editable && editable.closest('.child')
  const nextChild = child && child.nextElementSibling
  return nextChild && nextChild.querySelector('.editable')
}
