AOS.init();

const url = 'https://script.google.com/macros/s/AKfycbztkfQLcuLGOxAJkHwnGkW6jSHefGvA7vG8pOMu2cFQS3Jhg99iypIsYYsP4VICiwdyBw/exec'

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
    if (indexQuestion >= question.length) {
        indexQuestion = 0
    }
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

async function submitSurvey() {
    // call api
    const response = await fetch(`${url}?question=${indexQuestion + 1}&value=${itemChoose + 1}&action=post`);
    const data = await response.json();
    console.log(data);
    // reset
    itemChoose = 0
    const listItem = $('.item-choose');
    listItem.each((i, element) => {
        if (0 >= parseInt($(element).attr('data-id'))) {
            $(element).addClass('active');
        } else {
            $(element).removeClass('active');
        }
    });
    initQuestion();
}


function init() {
    initQuestion();
    initChooseSurvey();
}

init()