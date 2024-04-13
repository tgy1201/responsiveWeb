import React from "react";
import styles from './dashboard.module.css'
import PostCard from "../postCard/PostCard";
import Pagination from "../pagination/Pagination";
import { useSearchParams } from "react-router-dom";

function Dashboard ({posts}) {
    const [searchParams] = useSearchParams();

    const page = searchParams.get('page');
    const postsPerPage = 6;
    const firstPostIndex = ((page && parseInt(page) > 0 ? parseInt(page) : 1) - 1) * postsPerPage;
    const lastPostIndex = firstPostIndex + postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <div className={styles.container}> 
                {currentPosts.map((post, idx)=>
                (
                <div className={styles.post_wrap} key={idx}>
                    <PostCard post={post} />
                </div>
                ))}
            </div>
            <Pagination
                postsNum = {posts.length} // 게시물 총 개수
                postsPerPage = {postsPerPage} // 페이지 당 게시물 개수
                currentPage = {page && parseInt(page) > 0 ? parseInt(page) : 1} // 현재 페이지
                pageCount = {5} // 페이지그룹 내 최대 페이지 번호 개수
            />
        </>
    )
}

export default Dashboard;