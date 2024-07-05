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

