import React, {useState, useEffect} from "react";
import axios from 'axios'

import './app.scss';
import NavBar from "../nav-bar/nav-bar";
import NewsPage from "../news-page/news-page";
import Spinner from "../spinner/spinner";
import ErrorBoundary from "../error-boundary/error-boundary";


const _baseUrl = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=6de3aaf1f3f0475787eec3cc7f5901c6';

const App = () => {

    //хук состояния для массива данных
    const [data, setData] = useState([]);

    const [isLoading, setLoading] = useState(true);

    //хук для определения подгрузки данных
    const [fetching, setFetching] = useState(true);

    //хук для асинхронной загрузки данных
    useEffect(() => {
        //каждый раз при изменении данных функция будет отрабатывать
        if (fetching) {
           // console.log('fetching');
            axios.get(_baseUrl)
                .then(response => {
                    //чтобы не перезатирать каждый раз данные, создаем новый массиви разварачиваем старое состояние
                    // и новое, полученное при запросе
                    setData([...data, ...response.data.articles]);
                    setLoading(true)

                })
                .finally(() => {
                    setFetching(false);
                    setLoading(false);
                })
        }

    }, [fetching]);

    //хук для добавления и снятия слушателя на скролл
    useEffect(() => {

        document.addEventListener("scroll", scrollHandleer);

        return function () {
            document.removeEventListener("scroll", scrollHandleer);
        }
    }, []);

    const scrollHandleer = (event) => {

        //общая высота страницы с учетом скролла event.target.documentElement.scrollHeight
        //текущее положения скролла от верха страницы event.target.documentElement.scrollTop
        //высота видимой области страницы window.innerHeight
        if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100) {
            //console.log('scroll');
            setFetching(true);
        }

    };

    return (
        <div className="app container">
            <ErrorBoundary>
                <NavBar/>
                {isLoading ? <Spinner/> : <NewsPage data={data}/>}
            </ErrorBoundary>
        </div>
    );


};

export default App;
