const $list = document.querySelector('ul');
const $button = document.querySelector('button');

function sendRequest(URL) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET',URL);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status !== 200) {
                    reject();
                }
                const users = JSON.parse(xhr.responseText);
                resolve(users);
            }
        };
        xhr.send();
    });
}
$button.addEventListener('click', () => {
    sendRequest('/users').then(
        (users) => {users.forEach(user => {
            const $li = document.createElement('li');
            $li.textContent = `${user.name} (${user.age})`;
            $list.appendChild($li);
        })}, //on fulfilled
        () => {}    //on rejected
    );
});