import React from 'react';
import './news-page.scss'
import NewsItem from "../news-item/news-item";


const NewsPage = ({data}) => {


    return (

        <div className='news-page' >

            <ul>
                <NewsItem data={data} />

            </ul>


        </div>

    );
};

export default NewsPage;


