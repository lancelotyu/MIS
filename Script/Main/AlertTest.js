        var
        d = Alertify.dialog,
        l = Alertify.log,
        aGet = Alertify.get,
        reset = function () {
            // aGet("toggleCSS").href = "alertify/dist/themes/alertify.default.css";
			aGet("toggleCSS").href = "alertify/dist/themes/alertify.bootstrap.css";
            d.labels.ok     = "确定";
            d.labels.cancel = "取消";
            d.buttonReverse = false;
            d.buttonFocus   = "ok";
            l.delay         = 5000;
        };

        