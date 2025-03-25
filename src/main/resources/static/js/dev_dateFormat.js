<!--
/*=======================================================================
*
* 상세설명 : 
*
* =======================================================================
*     수정일                 작성자                      내용
* -----------------------------------------------------------------------
*    25. 2. 12.         P0005339(김혜미)               최초 작성
*
*========================================================================
*/
-->

function init(){
    devDate();
    devArray();
}

function devDate(){
    
    let date1 = G_CUSTOM_DATE_FORMAT('2025-01-02');
    
    $('.date1').text(date1);
    $('.date1_change').text(date1.format('yyyy-MM-dd'));
}

function devArray(){
    let a1 = [
        {
            id : 1,
            title : 'title'
        },
        {
            id : 2,
            title : 'title'
        },
    ];
    
    let a2 = [
        {
            id : 1,
            title : 'title'
        },
    
        {
            id : 3,
            title : 'title3'
        },
        {
            id : 2,
            title : 'title4'
        },
    ];
    
    
    
    G_ARRAY_DUPLICATE(a1, a2, 'id');
}



// 2개의 array 중복 제거
// 같으면 1번째 array 로 유지
function G_ARRAY_DUPLICATE(a1, a2, sameKey){
    // array 합치기
    const total = [...a1, ...a2];
    
    // filter
    // ID 비교 후 a1 데이터 유지
    const newReviews = total.filter(
        (review, idx) => {
            return (
                total.findIndex((review1) => {
                    return review[sameKey] === review1[sameKey]
                }) === idx
            )
        }
    )
    
    // new Set
    // object 전체 비교
    const newReviews2 = [
        ...new Set(total.map((review) => JSON.stringify(review))),
    ].map((review) => JSON.parse(review));
    
    
    console.log(total);
    console.log(newReviews);
    console.log(newReviews2);
    
}

// 날짜 계산
function G_CUSTOM_DATE_DIFF(date1, date2){
    // date1과 date2 문자열을 Date 객체로 변환합니다.
    let startDate = G_CUSTOM_DATE_FORMAT(date1);
    let endDate = G_CUSTOM_DATE_FORMAT(date2);
    
    // 두 날짜 간의 시간 차이를 밀리초 단위로 계산합니다.
    let diffTime = endDate.getTime() - startDate.getTime();
    
    // 밀리초를 일 단위로 변환합니다.
    let diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    // 일수 차이를 반환합니다.
    return diffDays;
}

// date : string 2025-01-01 11:00
function G_CUSTOM_DATE_FORMAT(date){
    let year, month, day;
    let hour = 0;
    let min = 0;
    let sec = 0;
    
    if(date){
        if(date.indexOf('/') > -1){
            date = date.replaceAll('/', '-');
        }
        if(date.indexOf('.') > -1){
            date = date.replaceAll('.', '-');
        }
        
        if(date.indexOf('-') > -1){
             if(date.indexOf(' ') > -1){
                let tempDateSplit = date.split(' ');
                date = tempDateSplit[0];
                
                let splitTime = tempDateSplit[1].split(':');
                hour = parseInt(splitTime[0]);
                min = parseInt(splitTime[1]);
                sec = splitTime[2] ? parseInt(splitTime[2]) : 0;
            }
            
            let splitDate = date.split('-');
            
            year = parseInt(splitDate[0]);
            month = parseInt(splitDate[1]) - 1; // 0 : 1월 , 11 : 12월
            day = parseInt(splitDate[2]);
            
        }
        
        // console.log(year, month, day, hour, min, sec)
        return new Date(year, month, day, hour, min, sec);
        
    }else{
        console.log('날짜 필요');
        return false;
    }
}
