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
                //계산 결과를 표시하고 버퍼 초기화(초기화를 후에 해야 함)
                // $('.pane').innerText = calc(bufferData);
                // bufferData = ''
                
                let result = calculateStringExpression(G_CALCULATE_OBJ.data);
                console.log(result)
                break;
            default:
                //버퍼에 입력 숫자와 연산자 누적
                G_CALCULATE_OBJ.data += num;
                break;
        }
        
        $('.result').html(G_CALCULATE_OBJ.data);
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
    let postfix = infixToPostfix(expression.replace(/\s+/g, ''));
    // 후위 표기법 계산
    return evaluatePostfix(postfix);
}



function setMachine(){
    const mode = Util_GetParam('mode');
    
    switch (mode) {
        case 'normal':
            $('.random').html('');
            
            
            break;
        case 'add':
            
            $('.header_title').html('계산기 저장');
            $('.lastBtn').html('식');
            $('.lastBtn').removeClass('num_blue');
            
            // $('.lastBtn').val('saveBtn');
            
            break;
    }
}