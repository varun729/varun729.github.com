#! /usr/bin/python

import sys      # for command-line arguments
import os       # to list files in a directory

HOME_DIR  = "--home_dir"
PREFIX    = "--prefix"
EXTENSION = "--extension"

def get_files(path, extension):
        all_files = os.listdir(path)
        page_files = []
        for f in all_files:
                if f[-len(extension):] == extension:
                        page_files.append(f)
        return page_files

def get_order(filepath):
        fr = open(filepath, 'r')
        lines = fr.readlines()
        i = 0
        order = ""
        while i < len(lines):
                line = lines[i].strip()
                if line.find("%ORDER") >= 0:
                        while line.find("%$") < 0:
                                i += 1
                                line = lines[i].strip()
                                if line[0] == "%":
                                        continue
                                order += line
                        break
                i += 1


        fr.close()
        return long(order)

def sort(numbers):
        length = len(numbers)

        for i in range(0, length):
                for j in range(i+1, length):
                        if numbers[i] > numbers[j]:
                                temp = numbers[i]
                                numbers[i] = numbers[j]
                                numbers[j] = temp
        return numbers

def sort_files(path, files):
        order_map = {}  # orderId -> file map
        for f in files:
                order = get_order(path+f)
                order_map[order] = f
        
        orders = order_map.keys()
        orders = sort(orders)

        sorted_files = [order_map[i] for i in orders]
        return sorted_files

def print_files(args):
        i = 0
        home_dir = ""
        prefix = ""
        extension = ""
        while i < len(args):
                if args[i] == HOME_DIR:
                        i += 1
                        home_dir = args[i]
                elif args[i] == PREFIX:
                        i += 1
                        prefix = args[i]
                elif args[i] == EXTENSION:
                        i += 1
                        extension = args[i]
                i += 1

        path = home_dir + "/" + prefix
        files = get_files(path, extension)
        files = sort_files(path, files)

        for f in files:
                print prefix + f


if __name__ == "__main__":
        print_files(sys.argv)


