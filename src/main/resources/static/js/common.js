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