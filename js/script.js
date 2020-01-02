'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleTagAtribute = 'data-tags',
  optArticleAuthorAtribute = 'data-author',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';


const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
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
};

const generateTitleLinks = function (customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  let html = '';
  for(let article of articles){
    const id = article.getAttribute('id');
    const title = article.querySelector(optTitleSelector).innerHTML;
    const link = '<li><a href="#' +
            id + '"><span>' + title + '</span></a></li>';
    html = html + link;
  }
  titleList.insertAdjacentHTML('afterbegin', html);
  const links = titleList.querySelectorAll('a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
};
const calculateTagsParams = function (tags){
  const params = {max: 0, min: 9999999};
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
    console.log(tag);
  }
  return params;
};

const calculateTagClass = function (count, parms){

};

const generateTags = function () {
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html='';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute(optArticleTagAtribute);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const tagLink = '<li><a href="#tag-'+ tag +'">'+ tag +'</a></li>';
      /* add generated code to html variable */
      html = html + tagLink;
      /* [NEW] check if this link is NOT already in allTags */
      /*[QUERY] Nazwa funkcji w edytoże jest podświtlona i podaje informacje:
      Do not access Object.prototype method 'hasOwnProperty' from target object.
      Co złego jest w tym że używam Object.prototype method?*/
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag]= 1;
      }else{
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  const tagParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagParams);
  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<a href="#tag-'+ tag +'">'+ tag +'</a>' + ' (' + allTags[tag] + ') ';
  }
  /* [NEW] END LOOP: for each tag in allTags

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
};

const tagClickHandler = function (event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.href;
  /* make a new constant "tag" and extract tag from the "href" constant */
  //[QUERY] Tu w zadaniu było inne rozwiązanie ale u mnie nie zadziałało bo
  //href ma wartość 'http://localhost:3000/#tag-news' a w zadaniu pisze że 
  //powinno mieć #tag-news więc zrobiłem splita i przypisałem ostatni element 
  //z arraya teraz działa w każdym przypadku. Czy w java-scrypcie jest jakaś 
  //notacja jak w pythonie array[-1] - pierwszy od końca. No włąsnie skąd ta 
  //różnica?
  const tagArray = href.split('-');
  const tag = tagArray[tagArray.length - 1];
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
  for(let taglink of tagLinks){
  /* remove class active */
    taglink.classList.remove('active');  
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  //[QUERY] tu też jest problem z tym co zwraca href
  const plainHrefArray = href.split('/'); 
  const plainHref = plainHrefArray [plainHrefArray.length -1];
  const tagLinksToActive = document.querySelectorAll('a[href="' 
    + plainHref + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinksToActive){
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
};

const addClickListenersToTags = function (){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');    
  /* START LOOP: for each link */
  for(let tagLink of tagLinks){
  /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
};

const generateAuthors = function (){
  const articles = document.querySelectorAll(optArticleSelector);
  for(let article of articles){
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const articleAuthor = article.getAttribute(optArticleAuthorAtribute);
    authorWrapper.innerHTML = 
      authorWrapper.innerHTML 
      + ' <a href="#author-' 
      + articleAuthor.replace(' ','%') 
      +'">'
      + articleAuthor 
      +'</a>';
  }
};

const authorClickHandler = function (event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.href;
  const authorArray = href.split('-');
  const author = authorArray[authorArray.length - 1].replace('%',' ');
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for(let authorLink of authorLinks){
    authorLink.classList.remove('active');
  }
  const plainHrefArray = href.split('/'); 
  const plainHref = plainHrefArray [plainHrefArray.length -1];
  const autorLinksToActive = document.querySelectorAll(
    'a[href="' + plainHref + '"]'
  );
  for(let autorLink of autorLinksToActive){
    autorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
};

const addClickListenersToAuthors = function (){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
};

generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();