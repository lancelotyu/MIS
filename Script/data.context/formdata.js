(function ($) {
    function loadData(target, data) {
        $(target).find("[field]").each(function () {
            $(this).val(data[$(this).attr("field")]);
        });
        if (jsonDict) {
            $(target).find("select[dict]").each(function () {
                $(this).empty();
                var dict = jsonDict[$(this).attr("dict")];
                //            $(dict).each(function () {
                //                $(this).append($('<option value=' + dict[i]["CONTENTCODE"] + '>' + dict[i]["CONTENT"] + '</option>'))
                //            });
                if (dict) {
                    for (var i = 0; i < dict.length; i++) {
                        $(this).append($('<option value=' + dict[i]["CONTENTCODE"] + '>' + dict[i]["CONTENT"] + '</option>'))
                    }
                    $(this).val(data[$(this).attr("field")]);
                }
            });

            $(target).find("input[rq]").each(function () {
                alert(this);
                var rq = ConvertJSONDateToJSDateObject($(this).val());
                $(this).datebox("setValue", rq);
            });
            $(target).find("select[dict_tdfl]").each(function () {
                $(this).empty();
                var dict_tdfl = jsonDict[$(this).attr("dict_tdfl")];
                if (dict_tdfl) {
                    for (var i = 0; i < dict_tdfl.length; i++) {
                        $(this).append($('<option value=' + dict_tdfl[i]["XFLDM"] + '>' + dict_tdfl[i]["FLMC"] + '</option>'))
                    }
                    $(this).val(data[$(this).attr("field")]);
                }
            });
        }
    }

    function ConvertJSONDateToJSDateObject(cellval) {
        var date = new Date(parseInt(cellval.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }

    function postData(target, url, data) {
        var _json = {};
        //拼写Post Json
        $(target).find("[field]").each(function () {
            if ($(this).datebox && $(this).attr("rq") == "datetime") {
                _json[$(this).attr("field")] = $(this).datebox('getValue');
            }
            else
                _json[$(this).attr("field")] = $(this).val();
        });

        alert($(this).attr("field"));
        alert(_json["DJLXNAME"]);
        alert(_json[$(this).attr("field")]);
        //提交保存
        data["_json"] = JSON.stringify(_json);
        var prec = $.ajax({
            url: url,
            data: data,
            type: "POST",
            dataType: "json"
        }).done(function (e) { });

        prec.error = function (data) {
            alert("Your request is failed, pls check your internet and try again later!"
                + '<span style="color:red"' + data.Message + '</span>');
        }
    }

    $.fn.loadData = function (options, param) {
        loadData(this, param);
    }



    $.fn.postData = function (url, data) {
        postData(this, url, data);
    };
})(jQuery);





