try {
    $("<link>").attr({href: "https://unpkg.com/live2d-widget-model@1.0.1/dist/waifu.min.css", rel: "stylesheet", type: "text/css"}).appendTo('head');
    $('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
    $.ajax({url: "https://unpkg.com/live2d-widget-model@1.0.1/dist/waifu-tips.min.js", dataType:"script", cache: true, success: function() {
        $.ajax({url: "https://unpkg.com/live2d-widget-model@1.0.1/dist/live2d.min.js", dataType:"script", cache: true, success: function() {
            /* 可直接修改部分参数 */
            live2d_settings['hitokotoAPI'] = "hitokoto.cn";  // 一言 API
            live2d_settings['modelId'] = 0;                  // 默认模型 ID
            live2d_settings['modelTexturesId'] = 0;          // 默认材质 ID
            live2d_settings['modelStorage'] = false;         // 不储存模型 ID
            /* 在 initModel 前添加 */
            initModel("https://unpkg.com/live2d-widget-model@1.0.1/dist/waifu-tips.json");
        }});
    }});
} catch(err) { console.log("[Error] JQuery is not defined.") }
