#lang racket

;;; Tree nodes
(define (make-node value children)
  (cons value children))

(define (get-node-value node)
  (car node))

(define (get-node-children node)
  (cdr node))

(define (get-node-child-count node)
  (length (get-node-children node)))

(define (has-children? node)
  (not (= 0 (get-node-child-count node))))

(define (modify-node-value node value)
  (cons value (cdr node)))

(define (filter-node value nodes)
  ; remove all nodes which have the value 'value'
  (if (null? nodes)
      nodes
      (if (pair? nodes)
          (if (equal? value (get-node-value (car nodes)))
              (filter-node value (cdr nodes))
              (cons (car nodes) (filter-node value (cdr nodes))))
          (if (equal? value (get-node-value nodes))
              '()
              (cons nodes '())))))

(define (add-child node child)
  (cons (get-node-value node) 
        (cons child (get-node-children node))))

(define (remove-child node value)
  ; Remove all children which have the value 'value'
  (cons (get-node-value node)
        (filter-node value (get-node-children node))))
;;; Tree
(define (make-tree tree)
  (if (not (pair? tree))
      '()
      (let ((value (car tree))
            (children (map make-tree (cdr tree))))
        (make-node value children))))

;;;
(provide (all-defined-out))