

eaf.util.namespace('eaf.html.ui');

//thanks: http://stackoverflow.com/questions/3744270/dynamically-loading-css
eaf.html.ui.theme = function (url, callback) {
    var filename = url, sheet, i;
    var fileref = document.createElement("link");

    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", filename);

    readyfunc = function () {
        if (callback) callback();
    }

    timerfunc = function () {
        for (i = 0; i < document.styleSheets.length; i++) {
            sheet = document.styleSheets[i].href;
            if (sheet !== null && sheet.substr(sheet.length - filename.length) == filename)
                return readyfunc();
        }
        setTimeout(timerfunc, 50);
    }

    if (document.all) { //Uses onreadystatechange for Internet Explorer
        fileref.attachEvent('onreadystatechange', function () {
            if (fileref.readyState == 'complete' || fileref.readyState == 'loaded')
                readyfunc();
        });
    } else {    //Checks if the stylesheet has been loaded every 50 ms for others
        setTimeout(timerfunc, 50);
    }
    document.getElementsByTagName("html")[0].appendChild(fileref);
};