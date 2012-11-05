(function() {
    var _scriptDict = [
        'mootools-core-1.4.5.js',
        'mootools-more-1.4.0.1.js',
        'overlay.js',
        'Fx.ProgressBar.js',
        'mooui.js',
        'mooui-exts.js',
        //'mooupload.js',
        'mooui-pagination.js',
        //'openbox.js',
        'mooui-select.js',
        'mooui-validator.js',
        //'mootable.js',
        'mooui-dropdown.js',
        'mooui-tabs.js'
    ];
    var _loadScript = function (path, pre, data) {
        if (typeof data == 'string') {
            document.write('<script type="text/java' + 'script" src="' + path + pre + data + '"></script>');
        } else {
            for (var i in data) {
                _loadScript(path, pre, data[i]);
            }
        }
    };

    var getPath = function () {
        var scripts = document.getElementsByTagName('script');

        for (var i = scripts.length - 1; i >= 0; i--) {
            var m = scripts[i].src.match(/(.*)load-script.js$/);
            if (m) return m[1];
        }
    };
    _loadScript(getPath(), 'mooui-js/', _scriptDict);
})();
