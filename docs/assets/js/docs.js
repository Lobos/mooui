(function () {
    Locale.use('zh-CHS');

    window.$g = new new Class({
        initialize: function () {
            this.pages = {};
        },

        loadPage: function (url) {
            var main = $('main').empty().fade('hide');
            var data = this.pages[url];
            if (data) {
                main.set('html', data.h).fade('in');
                Browser.exec(data.j);
            } else {
                new Request.HTML({
                    url: url,
                    evalScripts: false,
                    onSuccess: function (t,e,h,j) {
                        main.set('html', h).fade('in');
                        prettyPrint();
                        Browser.exec(j);
                        //this.pages[url] = { h: main.get('html'), j: j };
                    }.bind(this)
                }).get();
            }
        }
    });

    var menus = [{
        txt: 'Home', icon: 'home', url: 'home.html'
    }, {
        txt: 'Scaffolding', icon: 'table', submenu: [
            { txt: 'Global styles', url: 'scaffolding/global.html' },
            { txt: 'Grid system', url: 'scaffolding/grid.html' },
            { txt: 'Fluid grid system', url: 'scaffolding/fluid.html' },
            { txt: 'Layouts', url: 'scaffolding/layouts.html' },
            { txt: 'Responsive', url: 'scaffolding/responsive.html' }
        ]
    }, {
        txt: 'Base css', icon: 'tasks', submenu: [
            { txt: 'Typography', url: 'basecss/typography.html' },
            { txt: 'Code', url: 'basecss/code.html' },
            { txt: 'Tables', url: 'basecss/tables.html' },
            { txt: 'Forms', url: 'basecss/forms.html' },
            { txt: 'Buttons', url: 'basecss/buttons.html' },
            { txt: 'Icons', url: 'basecss/icons.html' }
        ]
    }, {
        txt: 'Components', icon: 'tags', submenu: [
            { txt: 'Dropdowns', url: 'components/dropdowns.html' },
            { txt: 'Button groups', url: 'components/buttongroups.html' },
            { txt: 'Button dropdowns', url: 'components/buttondropdowns.html' },
            { txt: 'Navs', url: 'components/navs.html' },
            { txt: 'Navbar', url: 'components/navbar.html' },
            { txt: 'Breadcrumbs', url: 'components/breadcrumbs.html' },
            { txt: 'Pagination', url: 'components/pagination.html' },
            { txt: 'Labels and badges', url: 'components/labels.html' },
            { txt: 'Alerts', url: 'components/alerts.html' },
            { txt: 'Progress bars', url: 'components/progress.html' },
            { txt: 'Scrollbars', url: 'components/scrollbars.html' },
            { txt: 'Misc', url: 'components/misc.html' }
        ]
    }, {
        txt: 'Javascript', icon: 'legal', submenu: [
            { txt: 'Tabs', url: 'javascript/tabs.html' },
            { txt: 'Dropdowns', url: 'javascript/dropdowns.html' },
            { txt: 'Form Validator', url: 'javascript/formvalidator.html' },
            { txt: 'Select', url: 'javascript/select.html' },
            { txt: 'Pagination', url: 'javascript/pagination.html' },
            { txt: 'Tables', url: 'javascript/table.html' },
            { txt: 'Popover', url: 'javascript/popover.html' },
            { txt: 'Openbox', url: 'javascript/openbox.html' },
            { txt: 'ProgressBar', url: 'javascript/progress.html' },
            { txt: 'DatePicker', url: 'javascript/date.html' },
            { txt: 'Global', url: 'javascript/global.html' }
        ]
    }];

    var sidebar_menu = $('sidebar_menu');
    var top_menu = $('top_menu');
    menus.each(function (m, i) {
        //create sidebar menu item
        var lnk = new Element('a', {
            'html': m.txt,
            'class': 'handle-' + (i+1),
            'href': 'javascript:;',
            'events': {
                click: function () {
                    if (m.url) $g.loadPage(m.url);
                }
            }
        });
        var dt = new Element('dt').grab(lnk).inject(sidebar_menu);
        if (m.icon)
            new Element('i', {'class': 'icon-large icon-white icon-' + m.icon }).inject(dt, 'top');
        var dd = new Element('dd').inject(sidebar_menu);

        //create top menu item
        lnk = lnk.clone().cloneEvents(lnk);
        if (m.submenu) {
            lnk.addClass('dropdown-toggle');
            new Element('b', {'class': 'caret'}).inject(lnk);
        }
        var li = new Element('li').grab(lnk).inject(top_menu);

        //create submenu
        if (m.submenu) {
            var ul = new Element('ul', {
                'class': 'dropdown-menu'
            }).inject(li);

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

    //create dropdown
    top_menu.getElements('.dropdown-toggle').dropdown({reveal:true});

    new Fx.Accordion(sidebar_menu, '#sidebar_menu dt', '#sidebar_menu dd', {
        onActive: function (toggler, element) {
            toggler.addClass('active');
        },
        onBackground: function (toggler, element) {
            toggler.removeClass('active');
        }
    });

    $g.loadPage('home.html');
})();