const xhr = new XMLHttpRequest();
//addEventListener will do something in a Event
//load means after loading the http request
//we put the code first because we set addEventListener first 
//then trigger it by clicking it or anything else: button.click();

xhr.addEventListener('load', () => {
    console.log(xhr.response);
})
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();