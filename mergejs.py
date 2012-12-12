# -*- coding:utf-8 -*-
import codecs
import os, os.path

SCRIPTS_OUT = 'docs/assets/js/pack-script.js'

JS_LIST = [
    'mootools-core-1.4.5.js',
    'mootools-more-1.4.0.1.js',
    'overlay.js',
    'mooui.js',
    'mooui-exts.js',
    'mooui-progressbar.js',
    'mooui-pagination.js',
    'mooui-openbox.js',
    'mooui-select.js',
    'mooui-validator.js',
    'mooui-table.js',
    'mooui-dropdown.js',
    'mooui-datepicker.js',
    'mooui-tabs.js',
    'mooui-global.js'
]

def compress():
    js_list = ['docs/assets/js/mooui-js/' + s for s in JS_LIST]
    _execute(js_list, SCRIPTS_OUT)

def _execute(in_files, out_file, temp_file='.temp'):
    print 'Compressing JavaScript...'
    temp = open(temp_file, 'w')
    for file_path in in_files:
        print file_path

        f = open(file_path, 'rb')
        header = f.read(4)

        # check if have BOM...
        bom_len = 0
        encodings = [(codecs.BOM_UTF32, 4),
                     (codecs.BOM_UTF16, 2),
                     (codecs.BOM_UTF8, 3)]

        # ... and remove appropriate number of bytes
        for h, l in encodings:
            if header.startswith(h):
                bom_len = l
                break
        f.seek(0)
        f.read(bom_len)

        content = f.read() + "\n"
        f.close()

        temp.write(content)

    temp.close()

    os.system('uglifyjs -nc %s > %s' % (temp_file, out_file))

    org_size = os.path.getsize(temp_file)
    new_size = os.path.getsize(out_file)

    print '=> %s' % out_file
    print 'Original: %.2f kB' % (org_size / 1024.0)
    print 'Compressed: %.2f kB' % (new_size / 1024.0)
    print 'Reduction: %.1f%%' % (float(org_size - new_size) / org_size * 100)

    if temp_file == '.temp':
        os.remove(temp_file)

if __name__ == '__main__':
    compress()
