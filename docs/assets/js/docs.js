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
            txt: 'Home', icon: 'home', url: ''
        }, {
            txt: 'Scaffolding', icon: 'table', submenu: [
                { txt: 'Global styles', url: 'scaffolding/global.html' },
                { txt: 'Grid system', url: 'scaffolding/grid.html' },
                { txt: 'Fluid grid system', url: 'scaffolding/fluid.html' },
                { txt: 'Layouts', url: 'scaffolding/layouts.html' },
                { txt: 'Responsive', url: 'scaffolding/responsive.html' }
            ]
        }, {
            txt: 'Bass css', icon: 'tasks', submenu: [
                { txt: 'Typography', url: 'basecss/typography.html' },
                { txt: 'Code', url: 'basecss/code.html' },
                { txt: 'Tables', url: 'basecss/tables.html' },
                { txt: 'Forms', url: 'basecss/forms.html' },
                { txt: 'Buttons', url: 'basecss/buttons.html' },
                { txt: 'Icons', url: 'basecss/icons.html' }
            ]
        }, {
            txt: 'Components', icon: 'tags'
        }, {
            txt: 'Javascript', icon: 'legal'
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
            var dt = new Element('dt').grab(lnk).inject(sidebar_menu);
            if (m.icon)
                new Element('i', {'class': 'icon-large icon-white icon-' + m.icon }).inject(dt, 'top');
            var dd = new Element('dd').inject(sidebar_menu);

            //create top menu item
            lnk = lnk.clone().cloneEvents(lnk);
            if (m.submenu)
                new Element('i', {'class': 'icon-chevron-down'}).inject(lnk);
            var li = new Element('li').grab(lnk).inject(top_menu);
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
                    //top menu
                    new Element('li').grab(lnk_sub).inject(ul);

                    //sidebar menu
                    lnk_sub = lnk_sub.clone().cloneEvents(lnk_sub);
                    new Element('i', { 'class': 'icon-metro-right' }).inject(lnk_sub);
                    lnk_sub.addEvent('click', function () {
                        sidebar_menu.getElements('a.active').removeClass('active');
                        this.addClass('active');
                    });
                    lnk_sub.inject(dd);
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