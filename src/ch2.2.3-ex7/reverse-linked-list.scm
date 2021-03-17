; Scheme also has linked lists as its central data structure.
; But we want to capture the notion of "list head" like in the
; exercise, so we use a record.
(define-record linked-list (setter first))

(define-record-printer (linked-list lst out)
  (fprintf out "#<linked-list ~a>" (linked-list-first lst)))

; Reverses a linked list _in place_; that is, returns the same
; list record but with its elements reversed. The `first` link
; now points to the element that used to be _last_, and all the
; other links between the nodes have been inverted.
;
; Here is an algorithm for the function, written in the style of
; TAoCP:
;
;     Algorithm I (Invert a linked list). The linked list in L will be
;     reversed in place.
;
;     I1. [Initialize] Set P ← Λ, C ← FIRST[L].
;
;     I2. [End of list?] If C is Λ, go to I4.
;
;     I3. [Point link backwards] Set N ← LINK[C], LINK[C] ← P, P ← C,
;         C ← N. Go back to I2.
;
;     I4. [Point first node] Set FIRST[L] ← P. ■
(define (reverse-linked-list lst)
  (let ((previous-node '()))
    (let loop ((node (linked-list-first lst)))
      (and (not (null? node))
        (let ((next-node (cdr node)))
          (set-cdr! node previous-node)
          (set! previous-node node)
          (loop next-node))))
    (set! (linked-list-first lst) previous-node)))

(define lst (make-linked-list '(1 2 3 4 5)))
(reverse-linked-list lst)
(print lst)
