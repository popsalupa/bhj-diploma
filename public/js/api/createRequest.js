/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

 const createRequest = (options = {}) => {
    const {data, method, callback } = options;
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    let url = options.url;

    xhr.responseType = 'json';
     
    if (method != 'GET') {
        for (let key in data) {
            formData.append(key, data[key])
        }
    } 
    else {
        url += '?';
        for (let key in data) {
            url += `${key}=${data[key]}&`
        }
    }

    try {
        xhr.open(method, url);
        if (method === 'GET') {
            xhr.send()
        } 
        else {
            xhr.send(formData)
        }
    } 
    catch (err) {
        callback(err)
    }
     // нужно ли добавлять слушатель?
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(null, xhr.response);
        }
    });
};
Footer