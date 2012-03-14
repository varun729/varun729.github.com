#lang racket
(require racket/include)
(require racket/gui)
(require mrlib/gif)
(require "tree.rkt")
(require "draw_tree.rkt")

(define (units x) (* 60 x))
(define radius 10)

(define (show-tree t f)
  (define tree (make-tree t))
  (define show-value true)
  (if (null? f)
      (draw-tree tree units radius show-value)
      (draw-tree tree units radius show-value #:filename f)))

;;; file name
(define (get-file-name s type)
  (string-append "../../img/tree/" 
                 (if (number? s)
                     (number->string s)
                     s)
                 "." type))

;;; gif
(define (get-tree-bitmap img)
  (make-object bitmap% img 'png))

(define (create-tree-gif delay name img-list)
  (define tree-bitmap-list (map get-tree-bitmap img-list))
  (write-animated-gif tree-bitmap-list delay (get-file-name name "gif") #:loop? true #:one-at-a-time? false #:last-frame-delay 100))


;;; user-controlled part
(define (draw-tree-list-gif name tree-list #:force [force false])
  (let ((filename (get-file-name name "gif")))
    (cond ((and (not force) (file-exists? filename))
           (print (string-append filename " already exists."))
           (newline))
          (else
           (if (file-exists? filename)
               (delete-file filename)
               null)
           (define (show-tree-fu lis n)
             (cond ((null? lis) null)
                   (else (show-tree (car lis) (get-file-name n "png"))
                         (show-tree-fu (cdr lis) (+ n 1)))))
           (show-tree-fu tree-list 1)
           (create-tree-gif 100 name (map (lambda (y) (get-file-name y "png"))
                                          (build-list 
                                           (length tree-list)
                                           (lambda (y)
                                             (+ 1 (values y))))))))))



;;; example
(show-tree '(1(2)(3(4(10)(11))(5(6)(7)(8)(9)))) (get-file-name "tree" "png"))

;;; linear tree
(draw-tree-list-gif "linear" 
                    (list
                     '(1(2(3(4(5(6(7)))))))
                     '(1(2(3(* "blue" 4(5(* "blue" 6(7)))))))
                     '(1(2(* "red" 3(* "blue" 4(5(* "blue" 6(7))))))))
                    #:force true)

;;; simple tree
(draw-tree-list-gif "simple"
                    (list
                     '(1(2(3(4)(5))(6))(7(8)(9))))
                    #:force true)