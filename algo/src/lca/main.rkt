#lang racket
(require racket/include)
(require "tree.rkt")
(require "draw_tree.rkt")

(define tree (make-tree '(1(2)(3(4(10)(* 11))(5(6)(* 7)(8)(9))))))
(define (units x) (* 70 x))
(define show-value true)

(draw-tree tree units show-value)
