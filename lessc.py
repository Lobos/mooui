# -*- coding:utf-8 -*-

import os

if __name__ == '__main__':
    os.system('lessc %s %s -x' % ('pack.less', 'pack.css'))
    #os.system('lessc %s %s -x' % ('less/responsive.less', 'responsive.css'))

