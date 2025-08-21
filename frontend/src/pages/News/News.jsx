import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  setPage,
  fetchTopHeadlines,
//   fetchNewsByCategory,
} from "../../redux/newsSlice";
import ReactPaginate from "react-paginate";
import "./News.css";
import doctorPhoto from "../../assets/doctor.jpg";
import BreadCrumb from "../../components/BreadCrumb";

export default function NewsList() {
  const dispatch = useDispatch();
  const { articles, headlines, totalResults, loading, error, currentPage } =
    useSelector((state) => state.news);

  const pageSize = 5;
  const pageCount = Math.ceil(totalResults / pageSize);

  useEffect(() => {
    dispatch(fetchNews({ page: currentPage, pageSize }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(fetchTopHeadlines());
  }, [dispatch]);

  //   useEffect(() => {
  //     dispatch(fetchNewsByCategory("health"));
  //   }, [dispatch]);

  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div>
      {/* Banner */}
      <div
        className="w-full bg-cover bg-center relative py-5 h-70"
        style={{ backgroundImage: `url(${doctorPhoto})` }}
      >
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-start justify-center h-full">
          <BreadCrumb />
          <p className="text-5xl font-bold text-blue-950">Blogs Posts</p>
        </div>
      </div>

      {/* Content Layout */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-6 py-8">
        {/* Main News (2/3 width) */}
        <div className="w-full lg:w-2/3">
          <div className="grid grid-cols-1 gap-6">
            {articles.map((news, i) => (
              <div
                key={i}
                className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 flex flex-col border border-gray-300"
              >
                <img
                  src={news.urlToImage || "https://via.placeholder.com/300"}
                  alt={news.title}
                  className=" w-full object-cover rounded-md"
                />
                <div className="mt-3 flex flex-col justify-between flex-grow">
                  <h3 className="font-semibold text-lg">
                    {news.title.length > 80
                      ? news.title.slice(0, 80) + "..."
                      : news.title}
                  </h3>
                  <p>{news.description?.slice(0, 500) || "No description"}</p>
                  <div className="flex justify-between items-center mt-2 text-blue-500 text-sm">
                    <p>{news.publishedAt?.slice(0, 10) || "No date"}</p>
                    <p className="italic">{news.author || "Unknown"}</p>
                  </div>
                  <p className="text-gray-700 text-xs font-bold mt-1">
                    Source: {news.source?.name || "Unknown"}
                  </p>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block bg-blue-500 text-white px-3 py-2 rounded text-center hover:bg-blue-600 transition"
                  >
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="container mx-auto mt-8 flex justify-center ">
            {pageCount > 1 && (
              <ReactPaginate
                previousLabel={"< Prev"}
                nextLabel={"Next >"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={(e) => dispatch(setPage(e.selected + 1))}
                containerClassName={"pagination"}
                activeClassName={"active"}
                forcePage={currentPage - 1}
              />
            )}
          </div>
        </div>

        {/* Sidebar (1/3 width) */}
        <div className="w-full lg:w-1/3 shadow-md h-fit border border-gray-300 rounded-md ">
          <h2 className="text-2xl font-bold mb-5 text-center p-4 text-blue-950">
            Top Headlines
          </h2>
          <div className="flex flex-col gap-3">
                      {headlines.slice(0, 5).map((news, i) => (
                
              <div key={i} className="flex gap-3 items-start px-5 py-3">
                <img
                  src={news.urlToImage || "https://via.placeholder.com/100"}
                  alt={news.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex justify-between items-start ">
                    <p className="text-sm text-blue-600">
                      {news.publishedAt?.slice(0, 10) || "No date"}
                    </p>
                    <p className="text-blue-600 font-semibold text-sm">
                      {news.source?.name || "Unknown Source"}
                    </p>
                  </div>
                  <h4 className="text-base font-semibold leading-tight">
                    {news.title.length > 60
                      ? news.title.slice(0, 60) + "..."
                      : news.title}
                                  </h4>
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm mt-1 w-fit"
                    >
                      Read More
                    </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
