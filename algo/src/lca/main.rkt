#lang racket
(require racket/include)
(require "tree.rkt")
(require "draw_tree.rkt")

(define (units x) (* 70 x))

(define (show-tree t f)
  (define tree (make-tree t))
  (define show-value true)
  (if (null? f)
      (draw-tree tree units show-value)
      (save-tree tree units show-value f)))



;;; example
;(show-tree '(1(2)(3(4(10)(* "red" 11))(5(6)(* "red" 7)(8)(9)))) null)

;;; linear tree
(show-tree '(1(2(3(4(5(6(7))))))) "../../img/linear/1.png")
(show-tree '(1(2(3(* "red" 4(5(* "red" 6(7))))))) "../../img/linear/2.png")
(show-tree '(1(2(* "blue" 3(* "red" 4(5(* "red" 6(7))))))) "../../img/linear/3.png")
;(show-tree '(1(2(3(4(5(6(7))))))) "../../img/linear/4.png")
;(show-tree '(1(2(3(4(5(6(7))))))) "../../img/linear/5.png")
;(show-tree '(1(2(3(4(5(6(7))))))) "../../img/linear/6.png")

