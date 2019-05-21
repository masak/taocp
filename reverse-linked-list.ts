import {
    LinkedList
} from './linked-list';

// Reverses a linked list _in place_; that is, returns the same
// list object, but with its elements reversed. The `first` link
// now points to the element that used to be _last_, and all the
// other links between the nodes have been inverted.
//
// The example linked list above represents the list (1, 2, 3, 4, 5).
// Reversing this list would turn it into (5, 4, 3, 2, 1).
export function reverseLinkedList < T > (list: LinkedList < T > ): LinkedList < T > {
	if (list.first === 0) return list;

    function loopLinkedListObject(obj, values = []) {
        if (obj.first === 0) {
            return values;
        } else if (obj.first) {
            return loopLinkedListObject(obj.first, values)
        } else if (obj.link === 0) {
            values.unshift(obj.info);

            return values.reduceRight((a, b, i) => {
                if (i !== 0) {
                    return {
                        info: b,
                        link: a
                    };
                } else {
                    const newObj = {
                        info: b,
                        link: a
                    };
                    return {
                        first: {
                            info: values[0],
                            ...newObj
                        }
                    }
                }
            }, 0);

        } else {
            values.unshift(obj.info);
            return loopLinkedListObject(obj.link, values);
        }
    }
    return loopLinkedListObject(list);
}

