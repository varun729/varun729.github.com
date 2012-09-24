#lang racket
(require "tree.rkt")

(define (get-normal-tour tree)
  (define (recur-tour t)
    (cond ((null? t) '())
          (else
           (let ((v (get-node-value t)))
             (define children-euler-tour (map (lambda (c) (append (recur-tour c) (list v)))
                                              (get-node-children t)))
             (define result (append (list v) children-euler-tour))
             (flatten result)))))
  (recur-tour tree))

(define (get-euler-tour tree)
  (define (recur-tour t rank)
    (cond ((null? t) '())
          (else
           (let ((v rank))
             (define children-euler-tour (map (lambda (c) (append (recur-tour c (+ rank 1)) (list v)))
                                              (get-node-children t)))
             (define result (append (list v) children-euler-tour))
             (flatten result)))))
  (recur-tour tree 0))

(define (get-value-position array value)
  (define (iter pos arr)
    (if (null? arr)
        false
        (if (= value (car arr))
            pos
            (iter (+ pos 1) (cdr arr)))))
  (iter 0 array))

(define (get-min-position arr pos1 pos2)
  (define min-pos (if (< pos1 pos2)
                      pos1
                      pos2))
  (define max-pos (if (>= pos1 pos2)
                      pos1
                      pos2))
  (define len (+ 1 (- max-pos min-pos)))
  (define arr1 (drop arr min-pos))
  (define arr2 (take arr1 len))
  (define (find-minimum test-arr pos ans)
    (if (= pos (length test-arr))
        ans
        (if (< (list-ref test-arr pos) (list-ref test-arr ans))
            (find-minimum test-arr (+ 1 pos) pos)
            (find-minimum test-arr (+ 1 pos) ans))))
  (define res (find-minimum arr2 0 0))
  (+ min-pos res))

;;; Least common ancestor
(define (find-lca tree node1 node2)
  ;; key-nodes is the list of values of nodes for which LCA is to be found
  (define linear-tree (get-normal-tour tree))
  (define euler-tree (get-euler-tour tree))
  (define node1-position (get-value-position linear-tree node1))
  (define node2-position (get-value-position linear-tree node2))
  (define min-position (get-min-position euler-tree node1-position node2-position))
  (print linear-tree)
  (newline)
  (print euler-tree)
  (newline)
  (print (string-append (number->string node1-position) 
                        " " 
                        (number->string node2-position)))
  (newline)
  (print min-position))

(find-lca (make-tree '(1(2(3(4)(5)))(6(7)(8)))) 5 7)

;;;
(provide (all-defined-out))