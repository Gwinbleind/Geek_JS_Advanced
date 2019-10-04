const $list = document.querySelector('ul');
const $button = document.querySelector('button');
$button.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','/users');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.responseText, typeof xhr.responseText);

        }
    }
});