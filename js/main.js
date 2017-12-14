var myNumber;
var curName = 'first';
var arr = [];

var rule = {
    first: {
        times: 3,
        length: 10,
        cur: 0
    },
    second: {
        times: 3,
        length: 10,
        cur: 0
    },
    third: {
        times: 1,
        length: 2,
        cur: 0
    }
}

function history() {
    var result = JSON.parse(localStorage.getItem('result'))
    //
    if (result === null) return []
    var _temp = []
    //
    for (var key in result) {
        for (var inside in result[key]) {
            _temp = _temp.concat(result[key][inside])
        }
    }
    return _temp
}

/*随机所有的code并且不重复*/
function showRandomNum(num) {
    var code = [];
    const _temp = history();
    while (true) {
        var isExists = false;
        // 获取一个10–100范围的数
        var random = parseInt(1 + 100 * (Math.random()));


        // console.log(_temp)

        // 判断当前随机数是否已经存在
        // for (var i = 0; i < code.length; i++) {
        //     if (random === code[i]) {
        //         isExists = true;
        //         break;
        //     }
        // }
        if (code.indexOf(random) > -1) {
            isExists = true;
            break;
        }

        // 如果不存在，则添加进去
        if (!isExists && _temp.indexOf(random) === -1) {
            code.push(random);
        }
        console.log(code.length === rule[curName].length);
        // 如果有10位随机数了，就跳出
        if (code.length === rule[curName].length) {
            localStorage.number = code;
            arr = code;
            break;
        }
    }
    console.log(arr)
    var li = "";
    for (var i = 0; i < arr.length; i++) {
        li += '<li>' + arr[i] + '</li>';
    }
    $(".prize_list ul").html(li);


}

$(function () {
    $(".start").click(function () {
        const curType = $(this).data('type');

        if (curType !== curName) {
            curName = curType
            rule[curType].cur = 0
        }
        $('.title').html($(this).html());


        if (rule[curType].cur > rule[curType].times - 1) {
            alert("最后一轮完成。")
            displayResult()
            return
        }
        if ($("#prize_btn").val() == 0) {

            $("#prize_btn").val(1);
            var num = 10;
            // $("#prizeCount").val();
            myNumber = setInterval(function () {
                showRandomNum(num);
            }, 30);

        } else {

            $("#prize_btn").val(0);

            clearInterval(myNumber);
            var data = {
                first: {
                    0: [], 1: [], 2: []
                },
                second: {
                    0: [], 1: [], 2: []
                },
                third: {
                    0: []
                }
            };
            if (localStorage.getItem('result') !== null) {
                data = JSON.parse(localStorage.getItem('result'))
            }
            console.log(data[curType][rule[curType].cur])
            data[curType][rule[curType].cur] = arr;
            console.log(arr)
            localStorage.setItem('result', JSON.stringify(data))
            rule[curType].cur++
            displayResult()
        }


    });

    //回车键控制开始和停止
    $(document).keydown(function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            $(".start").click();
        }
    });

    $("#set_grade").change(function () {
        $(".prize_grade span").text(1);
        // $(this).val()
    });

    $("#prizeMoney").keyup(function () {
        $(".prize_grade i").text(1);
    });
});


function displayResult() {
    let html = "";
    let result = JSON.parse(localStorage.getItem('result'))
    const _alias = {
        0: '第一场',
        1: '第二场',
        2: '第三场'
    }
    if (result !== null) {

        for (let key in result[curName]) {
            html += `<ul><p>${_alias[key]}</p>`;
            let li = "";
            for (let i = 0; i < result[curName][key].length; i++) {
                li += '<li>' + result[curName][key][i] + '</li>';
            }
            html += li;
            html += "</ul>"
        }

        console.log(html)
        $("#content").html(html)
        $("#content_log").html(html)


    }
}



    $('.log').click(function(){ //jquery的点击事件
        $('.body-color').fadeIn(100);//全局变得黑的效果，具体的div就是theme-popover-mask这个
        $('.hide-body').slideDown(200);//将隐藏的窗口div显示出来
        let html = "";
        let result = JSON.parse(localStorage.getItem('result'))
        const _alias = {
            0: '第一场',
            1: '第二场',
            2: '第三场',
            first: '第一轮',
            second: '第二轮',
            third: '第三轮',

        }
        if (result !== null) {

            for(let outside in result) {
                html+=`<h3 class=\"title\">${_alias[outside]}</h3>`;
                for (let key in result[outside]) {
                    html += `<ul><p>${_alias[key]}</p>`;
                    let li = "";
                    for (let i = 0; i < result[outside][key].length; i++) {
                        li += '<li>' + result[outside][key][i] + '</li>';
                    }
                    html += li;
                    html += "</ul>"
                }

            }




            console.log(html)
            $("#content_log").html(html)


        } else {
            $("#content_log").html('<h3>暂无内容</h3>')
        }
    })
    $('.close-window .close').click(function(){
        $('.body-color').fadeOut(100);//
        $('.hide-body').slideUp(200);//将显示的窗口隐藏起来
    })



