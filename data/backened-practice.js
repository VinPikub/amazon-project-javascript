const xhr = new XMLHttpRequest();
//we will get different response by using different url path
// /hello /products/first are url paths
xhr.addEventListener('load', () => {
    console.log(xhr.response);
})
xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
//xhr.open('GET', 'https://supersimplebackend.dev/hello');
xhr.send();