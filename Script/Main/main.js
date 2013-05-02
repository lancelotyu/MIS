
var navigation = null;
$(function () {
    Neter.path('../').autoLoadSkin();

    $(window).resize(function () {
        var height = $('body').height() - $('#header').height();

        $('#view').css({
            height: $('body').height() - $('#header').height(),
			width:'100%',
            //overflow: 'auto',
			//margin:'auto',
            top: 88
        });
    }).trigger('resize');

    // 加载皮肤
    var s = new Neter.Skin();


    var win = null;
    $('.user').click(function () {
        win = new Neter.Window({
            title: '个人资料',
            content: 'Window...',
            buttons: [{
                name: '确定',
                cls: 'neter-button-primary',
                clickEvent: function (win, options, event) {
                    alert('不允许关闭');
                    return false;
                }
            }, {
                name: '取消',
                clickEvent: function (win, options, event) {
                    win.close();
                }
            }]
        }).render().content('我是更新后的内容...').title('重置后的标题...');
    });

    new Neter.ToolTips({
        trigger: $('.user'),
        position: 'bottom',
        content: $('#toolTipsContent')
    }).render();

    var box = null;
    var searchBar = new Neter.SearchBar({
        container: $('#searchBar'),
        placeholder: '全文搜索',
        optionsWindow: $('#boxContent').show(),
        alignment: 'right',
        searchEvent: function (searchBar, keyword) {
            new Neter.Tips({ msg: keyword.val() || '没有输入关键字' }).render().show(keyword.val() ? 'success' : 'warning');
        }
    }).render();

    // 单击body关闭下拉选项框
    $(document.body).live('click', function () { searchBar.hideOptionsWindow(); });

    // 单击选项框中的取消时关闭下拉选项框
    $('#cancel').bind('click', function () {
        searchBar.hideOptionsWindow();
    });

    var timer = null;

    showMenu($('#header ul li.setting'));
    $(document.body).click(hideMenu)
	.on('mouseenter', '#header ul li.setting', function () {
	    var el = $(this);
	    $(this).find('b').css({ backgroundImage: 'url(Resources/images/arrow_down_white.png)' });

	})
	.on('mouseleave', '#header ul li.setting', function () {
	    var el = $(this);
	    $(this).find('b').css({ backgroundImage: 'url(Resources/images/arrow_down.png)' });
	})
	.on('click', '#delBtn', function () {
	    menu.remove('3,2');
	});

    // 增加导航条
    navigation = new Neter.Navigation({
        container: $('#navigationContainer'),
        view: $('#view'),
        itemWidth: 91,
        removeItemEvent: function (navigation, options) {
            // console.log(options);
			
            //navigation.optionsMenuTrigger('remove', options.name);
        },
        items: [
            { name: '首页', url: 'Views/main.html', reload: true },
			//{ name: '首页', url: 'View/main.html', reload: true },
			//{ name : '查询案件', url : 'template/blank.html', closeButton : true },
			{ name: '案件办理', url: 'Views/Example.html', reload: true },
			{ name: '查询宗地', url: 'Views/spb.htm', reload: true },
			{ name: '统计汇总', url:'Plugin/demo.html', reload: true }
        // { name : '统计汇总', url : 'template/inbox.html', closeButton : true, reload : false, removedActiveItem : '首页' }
		],
        optionsStatus: true,
        //optionsMenu   : [{ name : '关闭全部', front : $('<img>', { src : Neter.path() + 'resources/images/close_all.png' }) }],
        optionsMenuEvent: function (navigation, options, event) {
		
            options.name == '关闭全部' ? navigation.remove() : navigation.active(options.name);
        }
    })
	.render()
	.active(0)
	.update('邮箱应用', {
	    name: '邮箱应用',
	    content: 'Resources/app.html',
	    url: '',
	    closeButton: Math.random() > .5    // 随机更新关闭按钮
	});

    // 加载触点插件
    // var dock = new Neter.Dock({
        // showType: 'v',
        // blink: false,
        // group: true,    // 为false时subApps不被加载；当true时，showType会强制设置为v
        // maskFlash: true,
        // items: [{
            // name: '查询案件',
            // icon: '../Content/Neter-master/resources/images/apps/address_48.png',
            // label: 2,
            // data: '第一个测试程序',
            // subApps: [{
                // name: '游戏天地',
                // icon: '../Content/Neter-master/resources/images/apps/games_48.png'
            // }, {
                // name: '更新通知',
                // icon: '../Content/Neter-master/resources/images/apps/subscribe_48.png'
            // }]
        // }, {
            // name: '邮箱应用',
            // icon: '../Content/Neter-master/resources/images/apps/app_48.png',
            // data: 'email app'
        // }, {
            // name: '收件箱',
            // icon: '../Content/Neter-master/resources/images/apps/inbox_48.png'
        // }, {
            // name: '电子名片',
            // icon: '../Content/Neter-master/resources/images/apps/ecard_48.png'
        // }, {
            // name: '记事本',
            // icon: '../Content/Neter-master/resources/images/apps/notepad_48.png'
        // }, {
            // name: '日历',
            // icon: '../Content/Neter-master/resources/images/apps/calendar_48.png'
        // }, {
            // name: '星座',
            // icon: '../Content/Neter-master/resources/images/apps/constellation_48.png'
        // }, {
            // name: '理财易',
            // icon: '../Content/Neter-master/resources/images/apps/money_48.png',
            // subApps: [{
                // name: '车险',
                // icon: '../Content/Neter-master/resources/images/apps/chexian_48.png'
            // }, {
                // name: '网上订票',
                // icon: '../Content/Neter-master/resources/images/apps/huoche_48.png'
            // }, {
                // name: '网络购物',
                // icon: '../Content/Neter-master/resources/images/apps/quan_48.png'
            // }]
        // }, {
            // name: '成语词典',
            // icon: '../Content/Neter-master/resources/images/apps/idiomdict_48.png'
        // }, {
            // name: '音乐盒1',
            // icon: '../Content/Neter-master/resources/images/apps/music_48.png'
        // }, {
            // name: '音乐盒2',
            // icon: '../Content/Neter-master/resources/images/apps/music_48.png'
        // }, {
            // name: '实验室',
            // icon: '../Content/Neter-master/resources/images/apps/lab_48.png'
        // }],
        // itemEvent: function (dock, options, type, event) {
            // Neter.log("单击了%s中的应用程序，配置信息为：%o", type, options, 'info');
        // }
    // }).render();
});

var menu,
	about;

function showMenu(el) {
    menu = (menu || new Neter.DropDownMenu({
        trigger: el,
        mode: 'click',
        showStatus: false,
        items: [{
            name: '密码管理',
            email: '洛阳市XXX',
            front: $('<div></div>').css({
                height: 20,
                background: 'url(' + Neter.path() + 'Resources/images/mail.png) no-repeat 3px 5px'
            })
        },
		{ name: '' },
		{ name: '换肤' },
		{ name: '实验室', subMenus: [
			{ name: '查询' },
			{ name: '打印' },
			{ name: '保存', subMenus: [
				{ name: '保存到硬盘' },
				{ name: '保存到图片' },
				{ name: '' },
				{ name: '保存至SQLite', mark: 'sqlite...' }
			]
			}
		]
		},
		{ name: '帮助' }
		],
        menuEvent: function (dropDownMenu, options) {
            Neter.log('菜单项名称：%s，附加数据：%s', $(this).text(), options.email || '', 'log');
            // // console.log(options);
            if (options.name == '换肤') {
                navigation.getIndex('换肤') == -1 && navigation.insert(-1, { name: '换肤', closeButton: true, url: 'template/skin.html' });

                navigation.active('换肤');
            }
            dropDownMenu.hide();
        }
    })
	.render()
    // 自动选择菜单，并且触发事件
	.selected('3,2,1'));
}

function hideMenu() {
    menu && menu.hide();
}

// 以下三个函数用于制作皮肤
// 
// 
// 
// function updateCss(css) {
    // $('<style></style>').append(css).appendTo(document.body);
// }

// function loadThemes(cssFile) {
    // var skin = $('link#skin');

    // cssFile = Neter.path() + 'themes/' + (cssFile || 'templates.css');

    // skin.length
		// ? skin.attr('href', cssFile)
		// : $('<link id="skin" rel="stylesheet" type="text/css" />').appendTo($('head').get(0)).attr('href', cssFile);
// }

// function stopAutoLoadThemes() {
    // Neter.stopAutoLoadSkin();
// }