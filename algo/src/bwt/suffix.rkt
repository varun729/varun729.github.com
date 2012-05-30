#lang racket

;;; text-end-identifier is larger than any character in text
(define (make-suffix-array text text-end-identifier)
  (define (random-list size)
    (build-list size
                values))
  (random-list (+ 1 (string-length text))))


;;; incomplete suffix array
(define (make-incomplete-suffix-array text text-end-identifier)
  (define (randomize array times)
    (if (< times 1)
        array
        (let ((size (length array)))
          (let ((a (random size))
                (b (random size)))
            (define new-array (map (lambda (y)
                                     (if (= y a)
                                         (list-ref array b)
                                         (if (= y b)
                                             (list-ref array a)
                                             (list-ref array y))))
                                   (build-list size values)))
            (randomize new-array (- times 1))))))
  (define s-array (make-suffix-array text text-end-identifier))
  (randomize s-array 5))

;;;
(provide (all-defined-out))