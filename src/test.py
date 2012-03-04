#!/usr/bin/python


import sys      # for command line arguments
import script.page


if __name__ == "__main__":
        script.page.parse_options(sys.argv)
        script.page.create_index()
