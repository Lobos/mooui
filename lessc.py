# -*- coding:utf-8 -*-

import os

if __name__ == '__main__':
    os.system('lessc %s %s -x' % ('css/docs.less', 'css/docs.css'))

