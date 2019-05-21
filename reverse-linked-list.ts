import { LinkedList, makeLinkedList } from './linked-list';

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// The example linked list above represents the list (1, 2, 3, 4, 5).
// Reversing this list would turn it into (5, 4, 3, 2, 1).
export function reverseLinkedList<T>(list: LinkedList<T>): LinkedList<T> {

  function loopLinkedListObject(obj, values = []) {
    if(obj.first === 0) {
        return values;
    } else if(obj.first) {
       return loopLinkedListObject(obj.first, values)
    } else if(obj.link === 0) {
       values.push(obj.info);
       return values.reverse();
    } else {
      values.push(obj.info); 
      return loopLinkedListObject(obj.link, values);
    }
  } 
  const linkedListValues = loopLinkedListObject(list);

  return makeLinkedList(...linkedListValues);
}

