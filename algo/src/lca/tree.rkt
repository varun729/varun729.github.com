#lang racket

;;; Tree nodes
(define (make-node value children special)
  (cons special (cons value children)))

(define (is-node-special? node)
  (car node))

(define (get-node-value node)
  (cadr node))

(define (get-node-children node)
  (cddr node))

(define (modify-node-value node value)
  (make-node value (get-node-children node) (is-node-special? node)))

(define (get-node-child-count node)
  (length (get-node-children node)))

(define (has-children? node)
  (not (= 0 (get-node-child-count node))))

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
  (make-node (get-node-value node) 
             (cons child (get-node-children node))
             (is-node-special? node)))

(define (remove-child node value)
  ; Remove all children which have the value 'value'
  (make-node (get-node-value node)
             (filter-node value (get-node-children node))
             (is-node-special? node)))
;;; Tree
(define (make-tree tree)
  (cond ((not (pair? tree)) '())
        (else
         (define special 
           (if (equal? '* (car tree))
               true
               false))
         (define value-tmp
           (if special
               cadr
               car))
         (define children-tmp
           (if special
               cddr
               cdr))
         (let ((value (value-tmp tree))
               (children (map make-tree (children-tmp tree))))
           (make-node value children special)))))

;;;
(provide (all-defined-out))