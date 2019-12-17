'use strict';
const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const hrefAtribute = clickedElement.getAttribute('href')
    
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const articleActive = document.querySelector(hrefAtribute);

    /* [DONE] add class 'active' to the correct article */
    articleActive.classList.add('active');
}  

const generateTitleLinks = function () {
    const titleList = document.querySelector('ul.list.titles');
    titleList.innerHTML = "";
    const articles = document.querySelectorAll('.posts article.post');
    for(let article of articles){
        const id = article.getAttribute('id');
        const title = article.querySelector('.post-title').innerHTML;
        const link = '<li><a href="#' + 
            id + '"><span>' + title + '</span></a></li>'
        titleList.innerHTML += link;
    }
    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
        link.addEventListener('click', titleClickHandler);  
    }
}


generateTitleLinks();

