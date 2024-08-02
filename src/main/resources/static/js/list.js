function init() {
    eventBind();
    
    getLocalAddList(createList);
}


function eventBind(){
    
    $(document).on('click', '.machine',function(){
        location.href = '/add?mode=normal';
    })
    
    $(document).on('click', '.addBtn',function(){
        location.href = '/add?mode=add';
    })
    
    $(document).on('click', '.delBtn' , function(){
        
        if($(this).hasClass('active')){
            let checked = $('.delCheckbox:checked');
            
            if(checked.length > 0){
                checked.map(function(idx, row){
                    let seq = $(row).index('.delCheckbox');
                    GLOBAL_LOCAL_LIST.splice(seq, 1);
                })
                
                setLocalAddList(function(){
                    toast('삭제 되었습니다.', function(){
                        location.href = '/';
                    })
                })
            
            }else{
                toast('삭제할 식을 선택 후 삭제버튼을 눌러주세요.');
            }
            
        }else{
            $('li').prepend('<input type=checkbox class="delCheckbox">');
            $('.delBtn').addClass('active');
        }
    })
    
    
    $(document).on('click', '.addLocalList a', function(){
        let seq = $(this).closest('li').data('seq');
        
        location.href = '/detail?seq=' + seq;
    })
}



function createList(){
    let LIST_HTML = '';
    
    if(GLOBAL_LOCAL_LIST.length > 0){
        GLOBAL_LOCAL_LIST.map(function(row, idx){
            // LIST_HTML += `
            //             <li>
            //                 <a href="javascript:">${row.sik}</a>
            //             </li>`;
            
            LIST_HTML += '<li class="noticeItem" data-seq="'+ idx +'">';
            LIST_HTML += '    <a href="javascript:;">';
            LIST_HTML += '        <div class="boardTit">';
            LIST_HTML += '            <p>';

            // LIST_HTML += '<span class="new">'+idx+'</span>';
            LIST_HTML += '<span class="new">'+ (idx + 1) +'</span>';
            LIST_HTML += row.title ? row.title : '-';
            LIST_HTML += '            </p>';
            LIST_HTML += '        </div>';
            LIST_HTML += '        <div class="boardInfo">';
            LIST_HTML += '            <p>';
            LIST_HTML += '                <span class="date">'+ StringToDate(row.reqDate).format('yyyy.MM.dd') +'</span>';
            LIST_HTML += '                <span>'+ row.sik +'</span>';
            LIST_HTML += '            </p>';
            LIST_HTML += '        </div>';
            LIST_HTML += '    </a>';
            LIST_HTML += '</li>';
        })
        
    }
    
    if(LIST_HTML === ''){
        LIST_HTML = '<li><div class="boardTit width100per"><p class="center">등록된 식이 없습니다.</p></div></li>';
        $('.delBtn').remove();
    }
    
    $('.addLocalList').html(LIST_HTML);
}