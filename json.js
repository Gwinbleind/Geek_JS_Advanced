const $list = document.querySelector('ul');
const $button = document.querySelector('button');
$button.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','/users');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            const users = JSON.parse(xhr.responseText);
            users.forEach(user => {
                const $li = document.createElement('li');
                $li.textContent = `${user.name} (${user.age})`;
                $list.appendChild($li);
            })
        }
    };
    xhr.send();
});