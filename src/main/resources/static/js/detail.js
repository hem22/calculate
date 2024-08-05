let G_DETAIL_SIK = null;
let G_SIK_RANDOM_OBJ = {};


function init(){
    getLocalAddList(getDetailSik);
    eventBind();
}


function eventBind(){
    // $(document).on('click', '.li_number', function(){
    //     $(this).closest('.random_li').find('.li_number_input').val('').focus();
    // })
    
    $(document).on('change', '.li_number_input', function(){
        const num = $(this).val() ? $(this).val() : null;
        const li = $(this).closest('.random_li');
        const randomCode = li.data('random');
        
        li.find('.number_span').html(': ' + num);
        
        changeMainSik(randomCode, num);
       
    })
    
    $(document).on('click', '.li_sik', function(){
        const li = $(this).closest('li').find('.depth_2');
        setResultSik(li);
    })
    
    $(document).on('click', '.depth2_result', function(){
        const val = $(this).data('val');
        
        const li = $(this).closest('.random_li');
        const randomCode = li.data('random');
        li.find('.number_span').html(': ' + val);
        
        changeMainSik(randomCode, val);
    })
    
    $(document).on('click', '.resetBtn', function(){
        const seq = getURLParams();
        GLOBAL_LOCAL_LIST[seq].result = [];
        setLocalAddList();
        toast('리셋이 완료되었습니다.')
    })
}

function setResultSik(li){
    
    if(GLOBAL_LOCAL_LIST.length > 0){
        let prevResult = '';
        
        GLOBAL_LOCAL_LIST.map(function(row){
            if(row.result){
                row.result.map(function(result){
                    prevResult += `
                        <li>
                            <a href="javascript:" class="depth2_result" data-val="${result}">${result}</a>
                        </li>
                    `
                })
            }
        })
        li.html(prevResult);
    }
 
}


function changeMainSik(randomCode, num){
    G_SIK_RANDOM_OBJ[randomCode] = num;
    
    let original_sik = G_DETAIL_SIK.sik;
    for (let key in G_SIK_RANDOM_OBJ ) {
        if(G_SIK_RANDOM_OBJ[key] || G_SIK_RANDOM_OBJ[key] !== 0){
            original_sik = original_sik.replace(key, G_SIK_RANDOM_OBJ[key]);
        }
    }
    
    let sik = calculateStringExpression(original_sik);
    if(!isNaN(sik)){
        sik = sik.toFixed(5);
        sik = parseFloat(sik);
        
        const sikResult = `
            <li>
                <div class="boardTit width100per">
                    <p class="center">
                        <span class="new" style="padding:0">=</span>
                        ${sik}
                        
                    </p>
                     <p class="expText">
                        결과값은 소수점 5자리까지 나오며 반올림 됩니다.
                    </p>
                </div>
            </li>
         `
        $('.addLocalList li').eq(0).after(sikResult);
        
        const seq = getURLParams();
        let result_obj = GLOBAL_LOCAL_LIST[seq].result;
        if(result_obj){
            GLOBAL_LOCAL_LIST[seq].result.push(sik);
        }else{
            GLOBAL_LOCAL_LIST[seq].result = [sik];
        }
        setLocalAddList();
        
    }
}




function getURLParams(){
    const url = new URL(window.location.href);
    const urlParams = url.searchParams;
    return urlParams.get('seq');
}

function getDetailSik(){
    const seq = getURLParams();
    G_DETAIL_SIK = GLOBAL_LOCAL_LIST[seq];
    
    $('.boardTit .sikDiv').html(G_DETAIL_SIK.sik);
    
    if(G_DETAIL_SIK.result && G_DETAIL_SIK.result.length > 0){
        const lastResult = G_DETAIL_SIK.result[G_DETAIL_SIK.result.length - 1];
        
        const sikResult = `
         <li>
                        <div class="boardTit width100per">
                            <p class="center">
                                <span class="new" style="padding:0">=</span>
                                ${lastResult}
                            </p>
                             <p class="expText">
                                이전에 계산된 값 입니다.
                            </p>
                        </div>
                    </li>
         `
        $('.addLocalList').append(sikResult);
    }
    
    createButton();
}


function createButton(){
    const sikArray = randomIndex(G_DETAIL_SIK.sik);
    let button_html = '';
    
    sikArray.map(function(row){
        // console.log(row)
        const randomCode = G_RANDOM_ARRAY.find(num => num === row);
        if(randomCode){
            G_SIK_RANDOM_OBJ[randomCode] = null;
            
            button_html += `
                <li class="random_li" data-random="${randomCode}">
                    <a href="javascript:">${randomCode}
<!--                    <input class="li_number_input" type=number style="opacity:0">-->
                    <span class="number_span"></span></a>
                    <ul class="depth_1">
                        <li>
<!--                            <a href="javascript:" class="li_number">숫자</a>-->
                            <a href="javascript:">
                                <input type="number" class="inputNumber li_number_input" placeholder="숫자 입력 후 화면 클릭">
                            </a>
                            
                        </li>
                        <li>
                            <a href="javascript:" class="li_sik">답 불러오기</a>
                            
                            <ul class="depth_2">
<!--                                <li><a href="javascript:">옵션 1</a></li>-->
<!--                                <li><a href="javascript:">옵션 2</a></li>-->
                            </ul>
                        </li>
                    </ul>
                </li>
            `
        }
    })
    
    $('.dropdownMenu .menu').html(button_html);
}


function randomIndex(expression){
    let returnArray = [];
    
    for (let i = 0; i < expression.length; i++) {
        let token = expression[i];
        if(G_RANDOM_ARRAY.includes(token)){
            returnArray.push(token);
        }
    }
    return returnArray;
}
