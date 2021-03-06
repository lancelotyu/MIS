<script type="text/javascript">
	(function() {
		// 加载主题
		var tl = $('#themesList');
		var skin = new Neter.Skin();
		$.getJSON('../themes/manifest.json', function(data) {
			for (var p in data) {
				$('<option value=' + p + '>' + p + '</option>').appendTo(tl);
			}
		});
		
		$('#setThemesBtn').on('click', function() {
			alert(tl.val());
			skin.status() && skin.applying(tl.val());
		});


		var accordion = new Neter.Accordion({
			width : 'auto',
			container : $('#navTree'),
			items : [{
				name : '待办案件'
			}, {
				name : '案件汇总',
				data : '自定义数据'
			}, {
				name : '案件查询'
			}, {
				name : ''
			}, {
				name : '文件中心',
				subMenus : [{
					name : '网盘'
				}, {
					name : '附件'
				}, {
					name : '云附件'
				}, {
					name : '相册'
				}]
			}],
			itemEvent : function(accordion, options) {
				options.name == '收件' && navigation.active(options.name);
				// console.log(options);
			}
		})
		.render()
		// 自动选择第2个菜单，并且触发菜单事件，如果不想触发传递第二个参数为false
		.selected(1/*, false */);
		
		
		var nav = $('.navigation'),
			flag = 1,
			orig = {
				width : nav.width(),
				height : nav.height()
			};
		
		// 给左侧增加显示与隐藏滚动条事件，这个事件只有在出现滚动条时能看出效果。
		$('#navTree')
			.mouseenter(function() { $(this).css({'overflow' : 'auto'}); })
			.mouseleave(function() { $(this).css('overflow', 'hidden'); })
			// 当滚动了窗口则增加一个阴影。
			.scroll(function(e) {
				$('.contact-buttons').css('box-shadow' , $(this).scrollTop() > 0 ? '-2px 2px 6px rgba(0, 0, 0, .1)' : '');
			});;
		
		// 窗口调整大小时进行重新页面布局
		$(window).resize(function() {
			var height = $('#view').height($('body').height() - $('#header').height()).height(),
				nw     = nav.width();
			
			$('#home_panel').width($('body').width() - (nw > 15 ? 200 : 0)).height(height).css('left', nw > 15 ? 201 : 0);
			
			(nw > 15) && nav.height($('#home_panel').height());
			
			$('#navTree').css('height', height - 55);
			
			// 当左侧列表宽度大于15时，即为展开状态，这时候需要更新原始左侧的大小。
			nw > 15 && (orig = {
				width : nav.width(),
				height : nav.height()
			});
		}).trigger('resize');
		
		// 展开与折叠左侧列事件
		$('.control-button').live('click', function() {
			var self = $(this);
			
			// 互斥执行下面的两组事件
			!~(flag = flag * -1)
				// 折叠事件
				? $('.navigation').animate({ width  : 0 }, 20, function() {
					  $(this).find('b').css('background', 'url(../resources/images/arrow_right.png) no-repeat 0 0 ');
					  $(window).trigger('resize');
				  })
				// 展开事件
				: $('.navigation').animate({ width : orig.width }, 20, function() {
					  $(this).find('b').css('background', 'url(../resources/images/arrow_left.png) no-repeat 0 0 ');
					  $(window).trigger('resize');
				  });
		});
	})();
</script>