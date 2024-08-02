let G_USER_EMAIL = null;

function init(){

    kakaoInit();
    googleInit();
    naverInit();
}

function googleInit(){
    // let google = window.google;
    
    google.accounts.id.initialize({
        // 개발자센터 client id
        client_id:
            "270972068184-3uf0l3s9m2uemqvf9bfnrlr92c44m464.apps.googleusercontent.com",
        callback: this.googleCallback,
    });
    
    google.accounts.id.renderButton(document.getElementById("google_OAuth_login"), {
        theme: "outline",
        size: "large",
    });
    
    $(document).on('click', '#google_logout', function(){
        google.accounts.id.disableAutoSelect();
        
        
        if (G_USER_EMAIL) {
            google.accounts.id.revoke(G_USER_EMAIL, done => {
                console.log('User consent revoked.');
            });
        }
        
    })
}

function googleCallback(response) {
    const responsePayload = parseJwt(response.credential);
    console.log(responsePayload)
    G_USER_EMAIL = responsePayload.email;
}



function parseJwt (token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
}




function kakaoInit(){
    Kakao.init('0f821c6c154336ba3ed58b11d06aa75b'); //발급받은 키 중 javascript키를 사용해준다.
    console.log(Kakao.isInitialized()); // sdk초기화여부판단
    
    
    $(document).on('click', '#kakao_login', function(){
        kakaoLogin();
    })
    
    $(document).on('click', '#kakao_logout', function(){
        kakaoLogout();
    })
}


function kakaoLogin() {
    Kakao.Auth.login({
        success: function (response) {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function (response) {
                    console.log(response)
                },
                fail: function (error) {
                    console.log(error)
                },
            })
        },
        fail: function (error) {
            console.log(error)
        },
    })
}

//카카오로그아웃
function kakaoLogout() {
    if (Kakao.Auth.getAccessToken()) {
        Kakao.API.request({
            url: '/v1/user/unlink',
            success: function (response) {
                console.log(response)
            },
            fail: function (error) {
                console.log(error)
            },
        })
        Kakao.Auth.setAccessToken(undefined)
    }
}


function naverInit(){
    let naverLogin = new naver.LoginWithNaverId(
        {
            clientId: "x6bead7bWQgo9d5EZtwr", //내 애플리케이션 정보에 cliendId를 입력해줍니다.
            callbackUrl: "http://localhost:8084/info", // 내 애플리케이션 API설정의 Callback URL 을 입력해줍니다.
            isPopup: false,
            callbackHandle: true
        }
    );
    
    naverLogin.init();

}