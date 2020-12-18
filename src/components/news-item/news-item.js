import React from 'react';
import './news-item.scss'


const NewsItem = ({data}) => {

    const newsItem = data.map((item, index) => {

        const {author, title, description, urlToImage, publishedAt, content} = item;


        let showContent = () => {
            let coll = document.getElementsByClassName('collapsible');

            for (let i = 0; i < coll.length; i++){

                coll[i].addEventListener('click', function() {
                    this.classList.toggle('active');
                    let content = this.nextElementSibling;

                    if(content.style.maxHeight){
                        content.style.maxHeight = null;

                    }else{
                        content.style.maxHeight = '100%';

                    }
                })
            }
        };

        return (
            <li key={index} >
                {/*<div className='news-item' onClick={() => setToggleNews(!newsToggle)}>*/}
                <div className='news-item collapsible' onClick={() => showContent()}>

                    <div><img src={urlToImage} alt="image_" className='news-item-image'/></div>

                    <div className='desc '>

                        <h3>{title} </h3>
                        <p>{description}</p>
                        {/*<div style={{display: (newsToggle ? 'block' : 'none')}} > {content} </div>*/}

                        <p><i> Author  : </i> {author}   </p>
                        <p>Published at: {publishedAt}</p>
                    </div>





                </div>
                <div className='content'> {content} </div>
            </li>
        )
    });

    return newsItem;

};

export default NewsItem;