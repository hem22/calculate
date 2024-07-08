const G_RANDOM_ARRAY = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

let G_CALCULATE_OBJ = {
    data : 0,                   // 현재 식
    randomNum : 0,              // 난수의 갯수
    result : null
}


function init(){
    eventBind();
    setMachine();
}



function eventBind(){
    $(document).on('click', '.key-wrap > button', function(){
        // const num = String($(this).data('num'));
        const num = String($(this).val());
        if(G_CALCULATE_OBJ.data === 0){
            G_CALCULATE_OBJ.data = '';
        }
        
        switch(num){
            case "AC":
                //초기화
                G_CALCULATE_OBJ.data = 0;
                break;
            case "C":
                //초기화
                G_CALCULATE_OBJ.data = G_CALCULATE_OBJ.data.slice(0, -1);
                break;
            case "random":
                G_CALCULATE_OBJ.randomNum += 1;
                let randomText = G_RANDOM_ARRAY[G_CALCULATE_OBJ.randomNum];
                G_CALCULATE_OBJ.data += randomText;
                break;
            case "result":
                let result = calculateStringExpression(G_CALCULATE_OBJ.data);
                if(isNaN(result)){
                    toast('잘못된 식입니다. 다시 입력해주세요.');
                }else{
                    G_CALCULATE_OBJ.data = result;
                }
                break;
            case "addFormula" :
                toast('개발중');
                
                break;
            default:
                //버퍼에 입력 숫자와 연산자 누적
                G_CALCULATE_OBJ.data += num;
                break;
        }
        
        if(G_CALCULATE_OBJ.data === ''){
            G_CALCULATE_OBJ.data = 0;
        }
        $('.result').html(G_CALCULATE_OBJ.data);
    })
    
    
    
    $(document).on('click', '.addBtn', function(){
        
        let data = G_CALCULATE_OBJ.data;
        let result = calculateStringExpression(data);
        
        console.log(result)
    })
    
}




function calculateStringExpression(expression) {
    // 연산자 우선순위 정의
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    
    // 연산자와 피연산자를 구분하는 함수
    function isOperator(c) {
        return ['+', '-', '*', '/'].includes(c);
    }
    
    function isDigit(c) {
        return /\d/.test(c);
    }
    
    // 중위 표기법을 후위 표기법으로 변환하는 함수 (Shunting Yard Algorithm)
    function infixToPostfix(expression) {
        let outputQueue = [];
        let operatorStack = [];
        let numberBuffer = '';
        
        for (let i = 0; i < expression.length; i++) {
            let token = expression[i];
            console.log(token)
            
            if (isDigit(token) || token === '.') {
                numberBuffer += token;
            } else {
                if (numberBuffer) {
                    outputQueue.push(parseFloat(numberBuffer));
                    numberBuffer = '';
                }
                
                if (isOperator(token)) {
                    while (
                        operatorStack.length &&
                        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                        ) {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.push(token);
                } else if (token === '(') {
                    operatorStack.push(token);
                } else if (token === ')') {
                    while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                        outputQueue.push(operatorStack.pop());
                    }
                    operatorStack.pop();
                } else if (token.charCodeAt()){
                    // 랜덤 숫자 추가
                    operatorStack.push(token.charCodeAt());
                }
            }
        }
        
        if (numberBuffer) {
            outputQueue.push(parseFloat(numberBuffer));
        }
        
        while (operatorStack.length) {
            outputQueue.push(operatorStack.pop());
        }
        
        return outputQueue;
    }
    
    // 후위 표기법을 계산하는 함수
    function evaluatePostfix(postfix) {
        let stack = [];
        
        postfix.forEach(token => {
            if (typeof token === 'number') {
                stack.push(token);
            } else if (isOperator(token)) {
                let b = stack.pop();
                let a = stack.pop();
                switch (token) {
                    case '+':
                        stack.push(a + b);
                        break;
                    case '-':
                        stack.push(a - b);
                        break;
                    case '*':
                        stack.push(a * b);
                        break;
                    case '/':
                        stack.push(a / b);
                        break;
                }
            }
        });
        
        return stack[0];
    }
    
    // 공백 제거 및 후위 표기법으로 변환
    let postfix = infixToPostfix(expression.toString().replace(/\s+/g, ''));
    console.log(postfix)
    // 후위 표기법 계산
    return evaluatePostfix(postfix);
}



function setMachine(){
    const mode = Util_GetParam('mode');
    let textObj = {
        random : '',
        value : '',
    }
    
    switch (mode) {
        case 'normal':
            textObj.random = '.';
            textObj.value = '.';
            break;
            
        case 'add':
            textObj.random = '미지수';
            textObj.value = 'random';
            
            $('.num_random').addClass('threeWord');
            
            $('.header_title').html('계산기 저장');
            $('.lastBtn').addClass('threeWord').html('식추가').val('addFormula');
            $('.subSectionBtm').show();
            

            break;
    }
    
    $('.num_random').html(textObj.random).val(textObj.value);
    
}