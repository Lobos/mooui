# -*- coding:utf-8 -*-

import os

if __name__ == '__main__':
    os.system('lessc %s %s -x' % ('less/mooui.less', 'css/mooui.css'))
    os.system('lessc %s %s -x' % ('docs/assets/css/docs.less', 'docs/assets/css/docs.css'))

