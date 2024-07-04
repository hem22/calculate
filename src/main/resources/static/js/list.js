function init() {
    eventBind();
}


function eventBind(){
    
    $(document).on('click', '.machine',function(){
        location.href = '/add?mode=normal'
    })
    
    $(document).on('click', '.addBtn',function(){
        location.href = '/add?mode=add'
    })
}
