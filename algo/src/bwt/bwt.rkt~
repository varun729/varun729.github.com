#lang racket
(require "suffix.rkt")

;;; this is larger than any character in the alphabet set
(define text-end-identifier "$")

(define (make-bwt text)
  (define suffix-array 
    (make-suffix-array text text-end-identifier))
  (define bwt-index-array 
    (map (lambda (y)
           (if (= y 0)
               (string-length text)
               (- y 1)))
         suffix-array))
  (define t (string-append text text-end-identifier))
  (map (lambda (y)
         (string-ref t y))
       bwt-index-array))

(define b (make-bwt "abracadabra"))
(print b)