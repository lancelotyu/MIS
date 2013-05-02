var jsonDict;
$(function () {
    if (!jsonDict) {
        $.getJSON("../Home/GetDictionaryData", function (e) {
            jsonDict = e;
        });
    }
})