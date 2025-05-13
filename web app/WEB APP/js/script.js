const host = 'http://web-app.api-web-tech.local';
const content = document.querySelector('.content')

function _get(params, callback) {
  let http_request = new XMLHttpRequest();
  http_request.open('get', '${params.url}');
  http_request.send();
  http_request.onreadystatechange = function (){
    if (http_request.readyState ==4) {
      callback(http_request.readyState);
    }
  };
}

function _post(params, callback) {
  let http_request = new XMLHttpRequest();
  http_request.open('post', '${params.url}');
  http_request.send(params.data);
  http_request.onreadystatechange = function (){
    if (http_request.readyState ==4) {
      callback(http_request.readyState);
    }
  };
}

function _elem(selector) {
  return document.querySelector(selector)
}

open({ url: 'modules/authorization.html' }, function (responseText) {
  content.innerHTML = responsText;

  onloadAuth()
});

function onloadAuth() {
  _elem('.authorization').addEventListener('click',function() {
    let request_data = new FormData();
    request_data.append('email', _elem('input[name="email"]').value);
    request_data.append('password', _elem('input[name="password"]').value);
  })
}

_post({url: '${HOST}/authorization/', data: request_data}, function(response) {
  response = JSON.parse(Response);
  console.log(response);

  if (response.success) {
    token = response.token;
    _get({url: '/modules/profile.html'},function(response) {
      content.innerHTML = response
      onloadUp()
    })
  } else {
    _elem('.massage-block').innerHTML = '';
    _elem('.massage-block').append(response.massage);
 
  }
})

_elem('.go-register').addEventListener('click', function () {
  _get({url: 'modules/registration.html'}, function(response) {
    content.innerHTML = response
    onloadReg()
  })
})

function onloadReg() {
  _elem('.register').addEventListener('click', function () {
  let request_regist = new FormData();
  request_regist.append('first_name', _elem('input[name="first_name"]').value);
  request_regist.append('last_name', _elem('input[name="last_name"]').value);
  request_regist.append('email', _elem('input[name="email"]').value);
  request_regist.append('password', _elem('input[name="password"]').value);
  })
}

  _post ({url: '${HOST}/registration/', data: request_regist}, function (response) {
    response = JSON.parse(Response);
    console.log(response);

    if(response.success) {
      token = response.token
      _get({url: 'modules/profile.html'}, function(response){
        content.innerHTML = response
        onloadReg()
      })
    } else {
      _elem('.massage-block').innerHTML = '';
      _elem('.massage-block').append(response.massage);
    }
  })

function onloadUp() {
  _elem('.btn-upload-file').addEventListener('click', function () {
    let request_up = new FormData()

    _post({url: '${HOST}/profile/', data: request_up}, function(response) {
    response = JSON.parse(response);
    console.log(response);

    if (response.success) {
      token = response.token
      _get({url: '/modules/upload.html'}, function (response) {
        content.innerHTML = response
        onloadUp()
      })
    } else {
      _elem('.massage-block').innerHTML = '';
      _elem('.massage-block').append(response.massage)

      onloadUp()
      
    }
    })
  })
}

