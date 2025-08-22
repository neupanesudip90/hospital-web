import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopHeadlines } from "../redux/newsSlice";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./News.css";

function News() {
  const dispatch = useDispatch();
  const { articles,   loading,  } =
    useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);

  let newsContent;

  if (loading) newsContent = <p>Loading news...</p>;
  else if (articles.length > 0) {
    newsContent = (
      <Swiper
        key={articles.length}
        slidesPerView={2}
        grid={{ rows: 2, fill: "row" }}
        spaceBetween={40}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Grid, Pagination, Autoplay]}
        breakpoints={{
          240: { slidesPerView: 1, grid: { rows: 1, fill: "row" } },
          768: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
          1024: { slidesPerView: 2, grid: { rows: 2, fill: "row" } },
        }}
      >
        {articles.map((news) => (
          <SwiperSlide key={news.url || news.title}>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md lg:flex flex-cols justify-between items-start">
              <img
                src={news.urlToImage || "https://via.placeholder.com/150"}
                alt={news.title}
                className="h-40 w-60 object-cover rounded"
              />
              <div className="flex flex-col justify-between lg:ml-4 items-start">
                <h3 className="mt-2 font-bold text-sm">
                  {news.title?.length > 100
                    ? news.title.slice(0, 100) + "..."
                    : news.title}
                </h3>
                <div className="flex justify-between items-center w-full mt-2 text-blue-500 font-semibold text-sm">
                  <p>{news.publishedAt?.slice(0, 10) || "No date"}</p>
                  <p className="italic">Author: {news.author || "Unknown"}</p>
                </div>
                <p className="text-gray-700 text-xs font-bold mt-1">
                  Source: {news.source?.name || "Unknown source"}
                </p>
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm mt-3"
                >
                  Read More
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  } else newsContent = <p>No news available.</p>;

  return (
    <div className="mt-10 container">
      <h2 className="text-xl text-blue-600 font-bold mb-2 text-center">
        BETTER INFORMATION, BETTER HEALTH
      </h2>
      <h1 className="text-2xl font-bold mb-4 text-blue-950 text-center">
        NEWS
      </h1>
      {newsContent}
    </div>
  );
}

export default News;
