(function (){
    let usp = new URLSearchParams();
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
        const location = window.location;
        let usp = new URLSearchParams(location.search);
        if (!usp.get('page')){
            usp.set('page',1);
        }
        
        let postsAlbum = document.querySelector('main .container');
        let postsCards = postsAlbum.querySelectorAll('.col');
        const numberOfPages = (await sendRequest(gorestURL+'/posts','GET')).meta.pagination.total;
        const curPage = usp.get('page');
        console.log(curPage);
        const postsData = await loadPosts(curPage);
        for(let i=0;i<postsCards.length;i++){
            let postCard = postsCards[i];
            let postText = postCard.querySelector('.card-text');
            let postTitle = postCard.querySelector('h3');
            let detailPostLink = postCard.querySelector('.stretched-link');
            postTitle.innerHTML = "Post #"+(i+1+(curPage-1)*20);
            postText.innerHTML = postsData.data[i].body.slice(0,200)+"...";
            detailPostLink.href = "/detail-post.html?id="+i;
        }
    }
    window.createPosts = createPosts;
})()