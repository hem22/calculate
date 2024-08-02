
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
            case "addFormula":
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
            // case "addFormula" :
            //     toast('개발중');
            //
            //     break;
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
        if($(this).hasClass('saving')){
        
        }else{
            $(this).addClass('saving')
            getLocalAddList(addData);
        }
        
        
        
    })
    
}


function addData(){
    const title = $('.sikTitle').val();
    
    let tempData = {
        reqDate : new Date(),
        sik : G_CALCULATE_OBJ.data,
        title : title
    }
    GLOBAL_LOCAL_LIST.push(tempData);
    
    let JsonData = JSON.stringify(GLOBAL_LOCAL_LIST);
    
    GenProc_SetStorage(localStorage, 'addCalculateList', JsonData, SEC_MODE);
    
    toast('저장되었습니다.', function(){
        location.href = '/';
    })
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
            textObj.random = '.';
            textObj.value = '.';
            
            $('.header_title').html('계산기 저장');
            $('.lastBtn').addClass('threeWord').html('미지수').val('addFormula');
            $('.subSectionBtm').show();

            break;
    }
    
    $('.num_random').html(textObj.random).val(textObj.value);
}