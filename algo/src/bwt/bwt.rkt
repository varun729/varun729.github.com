#lang racket
(require "suffix.rkt")

;;; this is larger than any character in the alphabet set
(define text-end-identifier "~")

(define (make-bwt suffix-proc text)
  (define suffix-array 
    (suffix-proc text text-end-identifier))
  (define bwt-index-array 
    (map (lambda (y)
           (if (= y 0)
               (string-length text)
               (- y 1)))
         suffix-array))
  (define t (string-append text text-end-identifier))
  (list->string (map (lambda (y)
                        (string-ref t y))
                      bwt-index-array)))


;;; run
(define s "acgttgacccaagtcgatccagtaccaggat")
(define b (make-bwt make-suffix-array s))
(print b)
(newline)

(define b2 (make-bwt make-incomplete-suffix-array s))
(print b2)