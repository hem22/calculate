
const G_RANDOM_ARRAY = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

let GLOBAL_LOCAL_LIST = [];



/**
 *
 * Function name : MUtilComm_GetParam
 * @param name
 * @returns {String}
 * Description :  스크립트에서 GET Parameter 사용
 */
function Util_GetParam(name, decodeURIBehindFlag) {
    let rtnval = '';
    let nowAddress = location.href;
    // let nowAddress = unescape(decodeURIComponent(location.href));
    // if(decodeURIBehindFlag){
    // 	nowAddress = location.href
    // }
    let parameters = (nowAddress.slice(nowAddress.indexOf('?')+1,nowAddress.length)).split('&');
    for(let i = 0 ; i < parameters.length ; i++)
    {
        let letName = parameters[i].split('=')[0];
        if(letName.toUpperCase() == name.toUpperCase())
        {
            rtnval = parameters[i].split('=')[1];
            if(decodeURIBehindFlag){
                rtnval = unescape(decodeURIComponent(parameters[i].split('=')[1]));
            }
            break;
        }
    }
    return rtnval;
}

function headerEvent(){
    $(document).on('click', '.headerTop__title .headerBtnPrev', function(){
        history.back();
    })
}



function getLocalAddList(cb){
    let data = GenProc_GetStorage(localStorage, 'addCalculateList', SEC_MODE);
    data = JSON.parse(data);
    
    if(data){
        GLOBAL_LOCAL_LIST = data;
    }
    
    if(cb){
        cb();
    }
}



function setLocalAddList(cb){
    let JsonData = JSON.stringify(GLOBAL_LOCAL_LIST);
    
    GenProc_SetStorage(localStorage, 'addCalculateList', JsonData, SEC_MODE);
    
    if(cb){
        cb();
    }
}



function toast(msg, cb, duration){
    siiimpleToast.success(msg,
        {
            container: 'body',
            class: 'siiimpleToast',
            position: 'bottom|center',
            margin: 15,
            delay: 0,
            duration: duration? duration : 2000,
            style: {},
        }
    );
    if(cb){
        setTimeout(function(){
            cb();
        },  duration? duration : 2000);
    }
}


let SEC_MODE = "security_mode";
let gSecKey = {
    case1 : "addCalculate",
};


function GenProc_GetStorage(storage, key, security) {
    let result = null;
    let getStorage = null;
    let chkKey = GenProc_SearchStorage(storage, key);
    
    if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
        chkKey = GenProc_SearchStorage(storage, b64_md5(key));
    }
    
    if(chkKey == true) {
        if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
            getStorage = storage[b64_md5(key)];
        }else{
            getStorage = storage[key];
        }
        
        if(security == SEC_MODE && (typeof MarbleDecrypt != 'undefined')) {
            result = MarbleDecrypt(getStorage, gSecKey.case1);
        }else{
            result = getStorage;
        }
    }
    return result;
}

/**
 * Function name : GenProc_SearchStorage
 * Create by : JungHanYu
 * @param storage
 * @param key
 * @returns {Boolean}
 * Description :  스토리지에 해당 키에대한 값이 있을 경우 true를 반환한다.
 */
function GenProc_SearchStorage(storage, key) {
    if(storage == null || storage == undefined)
        return false;
    for(let i=0; i<storage.length; i++) {
        if(storage.key(i) == key) {
            return true;
        }
    }
    return false;
}

/**
 * Function name : GenProc_SetStorage
 * Create by : JungHanYu
 * @param storage : 스토리지 선택 (Ex: sessionStorage, localStorage)
 * @param key
 * @param value
 * @param security : (SEC_MODE - 암호화 SET / 그 외 - 일반 SET)
 * Description :  Storage에 key값에 대한 value 값 부여
 */
function GenProc_SetStorage(storage, key, value, security) {
    let result;
    let chkKey = GenProc_SearchStorage(storage, key);
    
    if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
        chkKey = GenProc_SearchStorage(storage, b64_md5(key));
    }
    
    
    // 만약 같은 Key에 값이 있을 경우 삭제 후 SET!!!
    if(chkKey == true) {
        GenProc_RemoveStorage(storage, key);
        if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
            GenProc_RemoveStorage(storage, b64_md5(key));
        }
    }
    // value 값 암호화 저장
    if(security == SEC_MODE && (typeof MarbleEncrypt != 'undefined')) {
        result = MarbleEncrypt(value, gSecKey.case1);
        storage[b64_md5(key)] = result;
    }else{
        result = value;
        storage[key] = result;
    }
    //console.log("스토리지에 저장하였습니다 : "+storage[key]);
}

/**
 * Function name : GenProc_RemoveStorage
 * Create by : JungHanYu
 * @param storage
 * Description :  Stroage를 Remove한다.
 */
function GenProc_RemoveStorage(storage, key, security) {
    let chkKey = GenProc_SearchStorage(storage, key);
    if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
        chkKey = GenProc_SearchStorage(storage, b64_md5(key));
    }
    
    if(chkKey == true) {
        if(security == SEC_MODE && (typeof b64_md5 != 'undefined')){
            storage.removeItem(b64_md5(key));
        }else{
            storage.removeItem(key);
        }
    }
}



function StringToDate(strDate){
    if(!strDate && strDate.length <= 0){
        return null;
    }
    
    // if(strDate.indexOf('.') > -1){
    // 	strDate = strDate.substring(0, strDate.lastIndexOf('.'));
    // }
    // hyemi 수정
    if(strDate.indexOf('.') > -1){
        strDate = strDate.replaceAll('.', '-');
    }
    if(strDate.indexOf('T') > -1){
        strDate = strDate.replaceAll('T', ' ');
    }
    
    let returnDate = null;
    if(strDate.indexOf(' ') > -1 && strDate.indexOf(':') > -1){
        //시간이 존재하는 경우
        let temp = strDate.split(' ');
        let tempDate = null;
        let tempTime = null;
        
        if(temp[0].indexOf('-') > -1){
            tempDate = temp[0].split('-');
        }else{
            if(temp[0].length >= 8){
                tempDate = [];
                tempDate.push(temp[0].substring(0, 4));
                tempDate.push(temp[0].substring(4, 6));
                tempDate.push(temp[0].substring(6, 8));
            }else{
                //길이가 7자리 이하인 경우
                return strDate;
            }
        }
        
        if(temp[1].indexOf(':') > -1){
            tempTime = temp[1].split(':');
        }
        
        if(tempDate.length > 2 && tempTime.length > 0){
            returnDate = new Date(tempDate[0], tempDate[1]-1, tempDate[2], tempTime[0], tempTime[1], tempTime[2]);
        }
        
    }else{
        //시간이 없는 경우
        if(strDate.indexOf('-') > -1){
            let tempDate = strDate.split('-');
            if(tempDate.length > 2){
                returnDate = new Date(tempDate[0], tempDate[1]-1, tempDate[2]);
            }
        }else{
            // - 없는 경우, YYYYMMDD 길이 이상인 경우
            if(strDate.length >= 8){
                let year = strDate.substring(0, 4);
                let month = strDate.substring(4, 6);
                let day = strDate.substring(6, 8);
                returnDate = new Date(year, month-1, day);
            }else{
                //길이가 7자리 이하인 경우
                return strDate;
            }
        }
    }
    
    return returnDate;
}


/**
 *
 * Function name : format
 * Create by : JungHanYu
 * @param f
 * @returns
 * Description :  입력받은 값을 Date Format으로 리턴
 * Ex)	2011년 09월 11일 오후 03시 45분 42초
 >> console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
 2011-09-11
 >> console.log(new Date().format("yyyy-MM-dd"));
 '11 09.11
 >> console.log(new Date().format("'yy MM.dd"));
 2011-09-11 일요일
 >> console.log(new Date().format("yyyy-MM-dd E"));
 현재년도 : 2011
 >>console.log("현재년도 : " + new Date().format("yyyy"));
 */
Date.prototype.format = function(f, inp, weeklist) {
    if (!this.valueOf()) return " ";
//   let weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let weekName = ["일", "월", "화", "수", "목", "금", "토"];
    let weekNameEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if(weeklist && typeof(weeklist) == 'object'){
        weekName = weeklist;
    }
    let d = this;
    
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p|aep|MN)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear(inp);
            case "yy": return ((d.getFullYear(inp) % 1000) % 100).zf(2);
            case "MM": return (d.getMonth(inp) + 1).zf(2);
            case "MN": return monthName[d.getMonth(inp)];
            case "dd": return d.getDate(inp).zf(2);
            case "DD": return d.getDate(inp);
            case "E": return weekName[d.getDay(inp)];
            case "e": return weekNameEn[d.getDay(inp)];
            case "HH": return d.getHours(inp).zf(2);
            case "hh": return ((h = d.getHours(inp) % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes(inp).zf(2);
            case "ss": return d.getSeconds(inp).zf(2);
            case "a/p": return d.getHours(inp) < 12 ? "오전" : "오후";
            case "aep": return d.getHours(inp) < 12 ? "AM" : "PM";
            default: return $1;
        }
    });
};



function calculateStringExpression(expression) {
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
    // 후위 표기법 계산
    return evaluatePostfix(postfix);
}

function isDigit(c) {
    return /\d/.test(c);
}

// 연산자와 피연산자를 구분하는 함수
function isOperator(c) {
    return ['+', '-', '*', '/'].includes(c);
}


// 중위 표기법을 후위 표기법으로 변환하는 함수 (Shunting Yard Algorithm)
function infixToPostfix(expression) {
    // 연산자 우선순위 정의
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    
    let outputQueue = [];
    let operatorStack = [];
    let numberBuffer = '';
    
    for (let i = 0; i < expression.length; i++) {
        let token = expression[i];
        // console.log(token)
        
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
                // TODO :추가 필요
                // 랜덤 숫자 추가
                operatorStack.push(token);
                // operatorStack.push(token.charCodeAt());
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