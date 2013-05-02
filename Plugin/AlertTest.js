        "use strict";
        var
        d = Alertify.dialog,
        l = Alertify.log,
        $ = Alertify.get,
        reset = function () {
            // $("toggleCSS").href = "Plugin/alertify/dist/themes/alertify.default.css";
			$("toggleCSS").href = "Plugin/alertify/dist/themes/alertify.bootstrap.css";
            d.labels.ok     = "确定";
            d.labels.cancel = "取消";
            d.buttonReverse = false;
            d.buttonFocus   = "ok";
            l.delay         = 5000;
        };

        // ==============================
        // Standard Dialogs
        $("alert").onclick = function () {
            reset();
            d.alert("提醒对话框弹出");
            return false;
        };

        $("confirm").onclick = function () {
            reset();
            d.confirm("确认对话框弹出", function () {
                l.success("你点击了确定");
            }, function () {
                l.error("你点击了取消");
            });
            return false;
        };
		
		$("prompt").onclick = function () {
            reset();
            d.prompt("带输入框的提示对话框", function (str) {
                l.success("你点击了确认并且值为: " + str);
            }, function () {
                l.error("你点击了取消");
            }, "默认值");
            return false;
        };

        // ==============================
        // Standard Dialogs
        $("notification").onclick = function () {
            reset();
            l.create("info", "标准提示消息");
            return false;
        };
		$("info").onclick = function () {
            reset();
            l.info("标准提示消息");
            return false;
        };

        $("success").onclick = function () {
            reset();
            l.success("成功提示消息");
            return false;
        };

        $("error").onclick = function () {
            reset();
            l.error("错误提示消息");
            return false;
        };
		
        var logAPI,
            canCreate   = true,
            canClose    = false,
            canRecreate = false,
            canReshow   = false;
        $("notiAPI").onclick = function () {
            if (canCreate) {
                reset();
                logAPI = logAPI || l.info("API driven log", 0);
                canCreate = false;
                canClose  = true;
                this.className = "button-primary is-disabled";
                $("closeAPI").className = "button-primary";
            }
            return false;
        };
        $("closeAPI").onclick = function () {
            if (canClose) {
                reset();
                logAPI.close();
                canClose    = false;
                canRecreate = true;
                this.className = "button-primary is-disabled";
                $("recreateAPI").className = "button-primary";
            }
            return false;
        };
        $("recreateAPI").onclick = function () {
            if (canRecreate) {
                reset();
                logAPI.create();
                canRecreate = false;
                canReshow   = true;
                this.className = "button-primary is-disabled";
                $("reshowAPI").className = "button-primary";
            }
            return false;
        };
        $("reshowAPI").onclick = function () {
            if (canReshow) {
                reset();
                logAPI.show();
                canReshow = false;
                canClose  = true;
                this.className = "button-primary is-disabled";
                $("closeAPI").className = "button-primary";
            }
            return false;
        };

        

        // ==============================
        // Custom Properties
        $("delay").onclick = function () {
            reset();
            l.info("10秒后隐藏", 10000);
            return false;
        };

        $("forever").onclick = function () {
            reset();
            l.info("直到点击才消失", 0);
            return false;
        };

        $("labels").onclick = function () {
            reset();
            d.labels.ok     = "同意";
            d.labels.cancel = "否认";
            d.confirm("自定义按钮名称的确认框", function () {
                l.success("你点击了确定");
            }, function () {
                l.error("你点击了取消");
            });
            return false;
        };

        $("focus").onclick = function () {
            reset();
            d.buttonFocus = "取消";
            d.confirm("Confirm dialog with cancel button focused", function () {
                l.success("你点击了确定");
            }, function () {
                l.error("你点击了取消");
            });
            return false;
        };

        $("order").onclick = function () {
            reset();
            d.buttonReverse = true;
            d.confirm("Confirm dialog with reversed button order", function () {
                l.success("你点击了确定");
            }, function () {
                l.error("你点击了取消");
            });
            return false;
        };

        // ==============================
        // Custom Themes
        $("bootstrap").onclick = function () {
            reset();
            $("toggleCSS").href = "Plugin/alertify/dist/themes/alertify.default.css";
            Alertify.dialog.prompt("其他样式", function () {
                l.success("你点击了确定");
            }, function () {
                l.error("你点击了取消");
            }, "默认值");
            return false;
        };
        