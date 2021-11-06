(function (){
    const gorestURL = 'https://gorest.co.in/public-api';
    async function sendRequest(url,method,body = null){
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 158df2693d96f420fb3e2a76233675f5d00e74335920445143dd6e17295c05e2'
        };
        const response = await fetch(url, {
            method: method,
            headers: headers
        })
        const data = await response.json();
        return data;
    }
    async function loadPosts(page){
        const data = await sendRequest(gorestURL+'/posts?page='+page,'GET');
        return data;
    }
    
    async function createPosts(){
        let postsAlbum = document.querySelector('main .container');
        let postsCards = postsAlbum.querySelectorAll('.col');
        const postsData = await loadPosts(1);
        console.log(postsData);
        for(let i=0;i<postsCards.length;i++){
            let postCard = postsCards[i];
            let postText = postCard.querySelector('.card-text')
            postText.innerHTML = postsData.data[i].body;
        }
    }
    window.createPosts = createPosts();
})()