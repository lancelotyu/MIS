

function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.dropdown > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            return false;
        });

        obj.opts.on('click', function () {
            var opt = $(this);
            obj.val = opt.text();
            obj.index = opt.index();
            obj.placeholder.text(obj.val);
        });
    },
    getValue: function () {
        return this.val;
    },
    getIndex: function () {
        return this.index;
    }
}

$(function () {
    var dd = new DropDown($('#dd'));
    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-3').removeClass('active');
    });
});

/**
* 面板示例页
* @author Ly
* @date 2012/11/14
*/
$(function () {
    loadThemes();
    var panel = new Neter.Panel({
        container: $('#login'),
        bodies: [{
            tag: '账号登录',
            content: $('#account')
        }, {
            tag: '案件查询',
            content: $('#search')
        }]
    }).render();

    //	// 在第二个位置上插入一个新的标签
    //	panel.insert(1, {
    //		tag     : '自定义',
    //		content : '自定义'
    //	});
    //	
    //	// 将第二个标签修改为综合搜索
    //	panel.update(1, {
    //		tag     : 'Google搜索',
    //		content : '搜索结果'
    //	});

    //Neter.log('面板视图区域高度：%dpx', panel.getView().height(), 'log');

    //	// 页面加载2秒后删除第二个标签
    //	setTimeout(function() {
    //		tips.update('2秒后删除了第二个标签').show('warning');
    //		panel.remove(1);
    //	}, 2 * 1000);
    //	
    //	setTimeout(function() { tips.hide(); }, 1000);

    // 代理页面中的事件
    $(document)
    //	.on('click','#autoLoginOptions', function() {
    //		this.checked && tips.update('最近两周将会自动登录').show('success');
    //	})
	.on('click', '#loginBtn', function () {
	
		$('#focus-form').parsley('validate')
		if($('#focus-form').parsley('isValid'))
		{
			$(document.body).fadeOut('slow', function () { location.href = 'Home.html'; });
		}
	})
	.on('click', '#closeBtn', function () {
	    reset();
		l.create("info", "关闭");
		return false;
	});
});


function loadThemes() {
    var themes = ['winter', 'thanksgiving1', 'thanksgiving2', 'thanksgiving3', 'thanksgiving4', 'window1', 'window2', 'window3', 'para'],
		current = themes[Math.floor(Math.random() * 100) % themes.length];

    $('#center').css('background', 'url(Resources/images/Login/' + current + '_bg.jpg) repeat 0 0');
    $('#container').css('background', 'url(Resources/images/Login/' + current + '.jpg) no-repeat 0 0');
}