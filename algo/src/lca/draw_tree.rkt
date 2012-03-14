#lang racket
(require racket/gui)
(require racket/include)
(require "tree.rkt")
(require "util.rkt")

(define (get-tree-width tree)
  ;number of leaf nodes - 1
  (define (leaf-node-count t)
    (if (has-children? t)
        (sum-list (map (lambda (y) (leaf-node-count y))
                       (get-node-children t)))
        1))
  (- (leaf-node-count tree) 1))

(define (get-tree-height tree)
  ;number of levels - 1
  (define (tree-levels t)
    (if (has-children? t)
        (+ 1 (max-list (map (lambda (y) (tree-levels y))
                            (get-node-children t))))
        1))
  (- (tree-levels tree) 1))

(define (tree-point-methods i)
  (lambda (tree-point) (list-ref tree-point i)))

(define get-origin-x (tree-point-methods 0))
(define get-origin-y (tree-point-methods 1))
(define get-abs-x (tree-point-methods 2))
(define get-abs-y (tree-point-methods 3))
(define get-tp-width (tree-point-methods 4))
(define get-tp-height (tree-point-methods 5))
(define get-tp-value (tree-point-methods 6))
(define is-tp-special? (tree-point-methods 7))
(define get-tp-color (tree-point-methods 8))
(define get-children-points (tree-point-methods 9))

(define (make-tree-point origin-x origin-y width height units value special color children-points)
  ;define make-tree-point
  (if (null? children-points)
      (list (units origin-x) ; origin 
            (units origin-y) ; origin
            (units origin-x) ; absolute
            (units origin-y) ; absolute
            (units width)    ; width
            (units height)   ; height
            value
            special
            color
            children-points)
      (list (units origin-x)
            (units origin-y)
            (average-list (map (lambda (a) (get-abs-x a)) children-points))
            (units origin-y)
            (units width)
            (units height)
            value
            special
            color
            children-points)))

(define (make-point x y)
  (cons x y))

(define (x-arg point)
  (car point))

(define (y-arg point)
  (cdr point))

(define (draw-point point value node-color dc)
  (let ((x (x-arg point))
        (y (y-arg point)))
    (send dc set-smoothing 'aligned)
    (send dc set-pen "white" 1 'transparent)
    (send dc set-brush node-color 'solid)
    (send dc draw-ellipse (- x 5) (- y 5) 10 10)
    (if (null? value)
        null
        (send dc draw-text (convert-string value) (+ x 10) (- y 10)))))

(define (draw-edge p1 p2 dc)
  (let ((x1 (x-arg p1))
        (y1 (y-arg p1))
        (x2 (x-arg p2))
        (y2 (y-arg p2)))
    (send dc set-smoothing 'aligned)
    (send dc set-pen "black" 2 'solid)
    (send dc draw-line x1 y1 x2 y2)))

(define (draw-edges tree-coords dc)
  (let ((x (get-abs-x tree-coords))
        (y (get-abs-y tree-coords))
        (c-points (get-children-points tree-coords)))
    (let ((p (make-point x y)))
      (for-each (lambda (a-coord)
                  (draw-edges a-coord dc)
                  (let ((q (make-point (get-abs-x a-coord) (get-abs-y a-coord))))
                    (draw-edge p q dc)))
                c-points))))

(define (draw-points tree-coords dc show-value)
  (let ((x (get-abs-x tree-coords))
        (y (get-abs-y tree-coords))
        (value (if show-value (get-tp-value tree-coords) null))
        (node-color (get-tp-color tree-coords))
        (c-points (get-children-points tree-coords)))
    (let ((p (make-point x y)))
      (for-each (lambda (a-coord)
                  (draw-coords a-coord dc show-value))
                c-points)
      (draw-point p value node-color dc))))

(define (draw-coords tree-coords dc show-value)
  (draw-edges tree-coords dc)
  (draw-points tree-coords dc show-value))
;(define (draw-coords tree-coords dc show-value)
;  (let ((x (get-abs-x tree-coords))
;        (y (get-abs-y tree-coords))
;        (value (if show-value (get-tp-value tree-coords) null))
;        (special (is-tp-special? tree-coords))
;        (node-color (get-tp-color tree-coords))
;        (c-points (get-children-points tree-coords)))
;    (let ((p (make-point x y)))
;      (for-each (lambda (a-coord)
;                  (draw-coords a-coord dc show-value)
;                  (let ((q (make-point (get-abs-x a-coord) (get-abs-y a-coord))))
;                    (draw-edge p q dc)))
;                c-points)
;      (draw-point p value node-color dc))))

(define (paint-tree-graphics tree units dc show-value)
  (define (get-coordinates origin-x origin-y sub-tree)
    (cond ((has-children? sub-tree)
           (define (get-sub-tree-points x-start c)
             (if (null? c)
                 '()
                 (append
                  (list (get-coordinates x-start (+ 1 origin-y) (car c)))
                  (get-sub-tree-points (+ 1 x-start (get-tree-width (car c))) (cdr c)))))
           (define sub-tree-points (get-sub-tree-points origin-x 
                                                        (get-node-children sub-tree)))
           ; sub-tree-points : has the tree points for all the children
           (make-tree-point origin-x 
                            origin-y 
                            (get-tree-width sub-tree) 
                            (get-tree-height sub-tree)
                            units
                            (get-node-value sub-tree)
                            (is-node-special? sub-tree)
                            (node-color? sub-tree)
                            sub-tree-points))
          (else
           (make-tree-point origin-x origin-y 0 0 units (get-node-value sub-tree) 
                            (is-node-special? sub-tree) (node-color? sub-tree) null))))
  (define tree-coords (get-coordinates 1 1 tree))
  (draw-coords tree-coords dc show-value))

(define (paint-tree tree units show-value target-func)
  (define width (units (+ 2 (get-tree-width tree))))
  (define height (units (+ 2 (get-tree-height tree))))
  (define target (make-bitmap width height))
  (define dc (new bitmap-dc% [bitmap target]))
  (paint-tree-graphics tree units dc show-value)
  (target-func target))

(define (draw-tree tree units show-value)
  (paint-tree tree
              units
              show-value
              (lambda (target)
                (make-object image-snip% target))))

(define (save-tree tree units show-value filename)
  (paint-tree tree
              units
              show-value
              (lambda (target)
                (send target save-file filename 'png))))

;;;
(provide (all-defined-out))