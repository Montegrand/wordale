const correct = 'QWEEN';

/**
 * ## 요구사항
  *  - Requirements
  *  (1) 5글자 단어 (존재하는 단어가 아니어도 됨)
  *  (2) 6번의 시도 가능
  *  (3) 존재하면 노란색, 위치도 맞으면 초록색으로 표시
  *  (4) 게임 종료 판단

  *  (추가) 상단에 게임 시간 표시하기
  *  (선택) 키보드에도 동일하게 표시
  *  (선택) 키보드 클릭으로도 입력 가능
 */
function startApp(){
    const userAnswer = {};

    const rows = document.querySelectorAll('.board-row');

    let index = 0;
    let count = 0;
    let total = rows.length;

    const render = ()=>{
        const row = rows[count];
        const cells = row.children;

        for(const cell in cells){
            if(typeof cells[cell] !== "object") continue;
            cells[cell].innerText = userAnswer[cell] ? userAnswer[cell].char : '';
        };
    };

    const answerCheck = ()=>{
        if(userAnswer.length !== correct.length) return;

        const row = rows[count];
        const cells = row.children;

        for(const cell in cells){
            if(typeof cells[cell] !== "object") continue;
            const cellElement = cells[cell];

            cellElement.classList.add(userAnswer[cell].chk);
        };
    };

    const handleKeydown = e=>{
        const key = e.key.toUpperCase();
        const keyCode = e.keyCode;

        if(65<= keyCode && keyCode <= 90 && /[A-Z]/.test(key) && index < 5){
            userAnswer[index] = {
                char : key,
                chk : correct[index] === key ? 'strike'
                    : correct.includes(key) ? 'ball'
                    : 'out',
            };
            index++;
        }
        if(keyCode === 8 && index){
            index--;
            delete userAnswer[index];
        }
        if(keyCode === 13) answerCheck();

        render();

        console.log(userAnswer, keyCode)
    }

    document.addEventListener('keydown',handleKeydown);
};


startApp();