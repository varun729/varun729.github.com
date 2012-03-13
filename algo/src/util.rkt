#lang racket

(define (sum-list num-list)
  (if (null? num-list)
      0
      (+ (car num-list) (sum-list (cdr num-list)))))

(define (max-list num-list)
  (argmax (lambda (y) y) num-list))

(define (average-list num-list)
  (let ((s (sum-list num-list))
        (c (length num-list)))
    (/ s c)))

(define (convert-string value)
  (cond ((number? value)
         (number->string value))))

;;;
(provide (all-defined-out))