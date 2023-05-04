# Python function to convert each page of a pdf file into multiple png files

import os
import sys


def pdf2png(pdf_file, png_file):
    """
    Convert pdf file to png file
    :param pdf_file: pdf file
    :param png_file: png file
    :return:
    """
    os.system('convert -density 300 {} {}'.format(pdf_file, png_file))


def pdf2pngs(pdf_file, png_dir):
    """
    Convert pdf file to png files
    :param pdf_file: pdf file
    :param png_dir: png directory
    :return:
    """
    if not os.path.exists(png_dir):
        os.makedirs(png_dir)
    pdf2png(pdf_file, os.path.join(png_dir, 'page.png'))


if __name__ == '__main__':
    pdf_file = sys.argv[1]
    png_dir = sys.argv[2]
    pdf2pngs(pdf_file, png_dir)

# Path: qch1/gfx/gfx2/pdf2pngs.py
# Compare this snippet from qch1/gfx/gfx2/converter.py:
# #from re import M
