const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


function checkedFunction(id) {        
    let checkBox = $$('.checkbox')
    let span = $$('.inputCheck span')
    for(let i = 0; i < checkBox.length; i++){
        if(checkBox[i].id === id){
            checkBox[i].checked = true 
            span[i].style.visibility = 'visible'
        } 
        else{
            checkBox[i].checked = false
            span[i].style.visibility = 'hidden'
        }
    }
}

function submitForm(){
    let inputEmail = $('#email')
    let inputPhone = $('#phone')
    let inputFullName = $('#fullname')
    let checkBox = $$('.checkbox')
    let span = $$('.inputCheck span')
    let isInvalid = false    
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/     
    let phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/    
    if(regex.test(inputEmail.value) && inputPhone.value.match(phoneno) 
        && inputFullName.value.trim() && (checkBox[0].checked 
        || checkBox[1].checked)) isInvalid = true    
    if(isInvalid) 
    {
        inputEmail.value = ''
        inputPhone.value = ''
        inputFullName.value = ''
        alert('Đăng ký thành công!')
        checkBox[0].checked = false        
        checkBox[1].checked = false
        span[0].style.visibility = 'hidden'
        span[1].style.visibility = 'hidden'
    }
    else alert('Lỗi: Đăng ký không thành công!')
}


function Validator(options){
    var formElement = $(options.form)
    function validate(inputElement, rule){
        let messageElement = inputElement.parentElement.querySelector('.message')
        let errMessage = rule.test(inputElement.value)
        if(messageElement){
            messageElement.innerText = errMessage
        }
        else{
            messageElement.innerText = ''
        }
    }
    if(formElement){
        options.rules.forEach(function (rule){
            let inputElement = formElement.querySelector(rule.selector)
            if(inputElement){
                inputElement.onblur = function(){
                    validate(inputElement, rule)
                }
                inputElement.oninput = function(){
                    let messageElement = inputElement.parentElement.querySelector('.message')
                    messageElement.innerText = ''
                }
            }
        })
    }
}

Validator.isPhone = function(selector){
    return{
        selector: selector,
        test: function(inputValue){
            var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/                          
            return inputValue.match(phoneno) ? '' : 'Vui lòng nhập số điện thoại!'
        }
    }
}

Validator.isEmail = function(selector){
    return{
        selector: selector,
        test: function(inputValue){
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/            
            return regex.test(inputValue) ? '' : 'Vui lòng nhập Email!'
        }
    }
}

Validator.isFullName = function(selector){
    return{
        selector: selector,
        test: function(inputValue){
            return inputValue.trim() ? '' : 'Vui lòng nhập trường này!'
        }
    }
}