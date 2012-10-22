(function () {
    Locale.use('zh-CHS');

    (function () {
        window.$g = new new Class({
            initialize: function () {
                this.pages = {};
            },

            loadPage: function (url) {
                var main = $('main').empty();
                if (this.pages[url]) {
                    main.set('html', this.pages[url]);
                } else {
                    new Request.HTML({
                        url: url,
                        onSuccess: function (t,e,h,j) {
                            main.set('html', h);
                            prettyPrint();
                            Browser.exec(j);
                            this.pages[url] = main.get('html');
                        }.bind(this)
                    }).get();
                }
            }
        });

        var menus = [{
            txt: 'Home', url: ''
        }, {
            txt: 'Scaffolding', submenu: [
                { txt: 'Global styles', url: 'scaffolding/global.html' },
                { txt: 'Grid system', url: 'scaffolding/grid.html' },
                { txt: 'Fluid grid system', url: 'scaffolding/fluid.html' },
                { txt: 'Layouts', url: 'scaffolding/layouts.html' },
                { txt: 'Responsive', url: 'scaffolding/responsive.html' }
            ]
        }, {
            txt: 'Bass css', submenu: [
                { txt: 'Typography', url: 'basecss/typography.html' },
                { txt: 'Code', url: 'basecss/code.html' }
            ]
        }, {
            txt: 'Components'
        }, {
            txt: 'Javascript'
        }];

        var sidebar_menu = $('sidebar_menu');
        var top_menu = $('top_menu');
        menus.each(function (m, i) {
            //create sidebar menu item
            var lnk = new Element('a', {
                'html': m.txt,
                'class': 'handle-' + (i+1),
                'href': 'javascript:;'
            });
            new Element('dt').grab(lnk).inject(sidebar_menu);
            var dd = new Element('dd').inject(sidebar_menu);

            //create top menu item
            var li = new Element('li').grab(lnk.clone().cloneEvents(lnk)).inject(top_menu);
            var ul = new Element('ul', {
                'class': 'dropdown-menu'
            }).inject(li);

            //create submenu
            if (m.submenu) {
                li.addClass('dropdown');
                m.submenu.each(function (sm, j) {
                    var lnk_sub = new Element('a', {
                        'html': sm.txt,
                        'href': 'javascript:;',
                        'events': {
                            'click': function () {
                                $g.loadPage(sm.url);
                            }
                        }
                    });
                    lnk_sub.inject(dd);
                    new Element('li').grab(lnk_sub.clone().cloneEvents(lnk_sub)).inject(ul);
                });
            }

        });

        new MooDropMenu('top_menu');
        new Fx.Accordion(sidebar_menu, '#sidebar_menu dt', '#sidebar_menu dd', {
            onActive: function (toggler, element) {
                toggler.addClass('active');
            },
            onBackground: function (toggler, element) {
                toggler.removeClass('active');
            }
        });
    })();
})();