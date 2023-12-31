AOS.init();

const url = 'https://script.google.com/macros/s/AKfycbz92Ggjgq7ZpGUzFmbXtjnLni9FOPFvYD0WOO7XX2YcSNP2n8NcxgsOvN5jkfHxureozA/exec'

const question = [
    'Bạn biết rõ định nghĩa về trí tuệ nhân tạo.?',
    'Bạn bất ngờ về khả năng của trí tuệ nhân tạo.?',
    'Bạn thường xuyên sử dụng các sản phẩm ứng dựng trí tuệ nhân tạo.?',
    'Bạn chủ động sử dụng trí tuệ nhân tạo trong đời sống và công việc.?',
    'Trí tuệ nhân tạo giúp bạn làm việc hiệu quả hơn.?',
    'Trí tuệ nhân tạo giúp bạn tăng thu nhập.?',
    'Thông tin trí tuệ nhân tạo cung cấp cho bạn đều chính xác.?',
    'Bạn cung cấp thông tin cho trí tuệ nhân tạo với sự tin tưởng tuyệt đối.?',
    'Bạn sẽ sử dụng trí tuệ nhân tạo nhiều hơn trong tương lai.?',
    'Bạn tin trí tuệ nhân tạo sẽ tạo ra sự phát triển vượt trội cho Việt Nam.?',
];
let indexQuestion = 0;

function initQuestion() {
    const q = document.getElementById('question-survey');
    q.innerHTML = question[indexQuestion];
    indexQuestion++;
}

let itemChoose = 0;

function initChooseSurvey() {
    $('.item-choose').on( 'click', function(e) {
        const id = parseInt($(e.target).attr('data-id'));
        itemChoose = id;
        const listItem = $('.item-choose');
        listItem.each((i, element) => {
            if (id >= parseInt($(element).attr('data-id'))) {
                $(element).addClass('active');
            } else {
                $(element).removeClass('active');
            }
        });
    });
}

async function showData() {
    const response = await fetch(`${url}?question=${indexQuestion}&value=${itemChoose + 1}&action=all`);
    const data = await response.json();
    console.log(data)

    if (data.param) {
        for (let index = 0; index < data.param.length; index++) {
            const listItem = $(`.c${index + 1} .chart-value`);
            const listPer = $(`.c${index + 1} .chart-percent`);
            const total = data.param[index].reduce((partialSum, a) => partialSum + a, 0);
            listItem.each((i, element) => {
                const per = total > 0 ? data.param[index][i]/total : 0
                const h = Math.round(per * 300)
                $(element).css("height", `${h}px`);
                $(listPer[i]).html(`${Math.round(per * 100)}%`);
            });
        }
        
    }
}

function resetItemChoose() {
    const listItem = $('.item-choose');
    listItem.each((i, element) => {
        if (0 >= parseInt($(element).attr('data-id'))) {
            $(element).addClass('active');
        } else {
            $(element).removeClass('active');
        }
    });
}

async function submitSurvey() {
    
    $('#submitSurvey span').hide();
    $('#submitSurvey .loader').show();
    // call api
    const response = await fetch(`${url}?question=${indexQuestion}&value=${itemChoose + 1}&action=post`);
    const data = await response.json();
    
    $('#submitSurvey span').show();
    $('#submitSurvey .loader').hide();
    // reset
    itemChoose = 0
    resetItemChoose();
    $('#submitSurvey').hide();
    $('#nextSurvey').show();
    showData();
}


function nextSurvey() {
    resetItemChoose();
    if (indexQuestion >= question.length) {
        $('#submitSurvey').hide();
        $('#nextSurvey').hide();
    } else {
        $('#submitSurvey').show();
        $('#nextSurvey').hide();
        initQuestion();
        showData();
    }
}

const audio = new Audio('./images/music.mp3');

function initAudio() {
    $('#play').click(() => {
        console.log('123213')
        audio.play()
        $('#pause').show();
        $('#play').hide();
    })
    $('#pause').click(() => {
        audio.pause();
        $('#pause').hide();
        $('#play').show();
    })
}



function init() {
    // initQuestion();
    // initChooseSurvey();
    showData();
    // initAudio();
}

init()

$(window).on('load', function () {
    setTimeout(() => {
        $('.loading').hide();
    }, 2000)
})