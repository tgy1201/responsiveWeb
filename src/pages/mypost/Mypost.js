import React, { useEffect, useState } from "react";
import styles from './mypost.module.css';
import MypageMenu from "../../component/mypageMenu/MypageMenu";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import List from "../../component/List/List";

function Mypost ({active}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status');
    const page = searchParams.get('page');

    const [posts, setPosts] = useState([]);
    const [postsNum, setPostsNum] = useState(0);

    useEffect(()=> {
        const handlefetchPosts = async () => {
            try {
                const memberId = 2024; //example
                const url = active === 3
                    ? `http://175.45.202.225:8080/mypage/${memberId}/posting`
                    : active === 4 
                    ? `http://175.45.202.225:8080/mypage/${memberId}/vote`
                    : `http://175.45.202.225:8080/mypage/${memberId}/liked`; //active 5
                
                const response = await axios.get(url, {
                    params: {
                        status: status && status,
                        page: page ? parseInt(page) : 1,
                    },
                });
                setPostsNum(response.data.result.totalElements);
                setPosts(response.data.result.postList);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        handlefetchPosts();
    }, [active, status, page])

    const handleChangeStatus = (status) => {
        if(status) {
            searchParams.set('status', status);
        } else {
            searchParams.delete('status');
        }
        navigate(`?${searchParams.toString()}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.pc_mypage}>
                <section className={styles.sidebar_wrap}>
                    <MypageMenu active={active}/>
                </section>
                <section className={styles.content}>
                    <div className={styles.title_wrap}>
                        <p>{active===3 ? '작성한 글' : active === 4 ? '투표한 글' : '좋아요한 글' }</p>
                    </div>
                    <div className={styles.status_wrap}>
                        <ul>
                            <li className={!status ? styles.all : ""} onClick={()=>handleChangeStatus()}>전체</li>
                            <li className={status === 'progress' ? styles.progress : ""} onClick={()=>handleChangeStatus('progress')}>투표중</li>
                            <li className={status === 'end' ? styles.end : ""} onClick={()=>handleChangeStatus('end')}>투표종료</li>
                        </ul>
                    </div>
                    <div className={styles.postNum}>총 <span style={{color: '#ac2323'}}>{postsNum}</span> 개의 게시글</div>
                    <List posts={posts} postsNum={postsNum} postsPerPage={10} page={page}/>
                </section>
            </div>
            <div className={styles.mobile_mypage}>
                <section className={styles.topbar_wrap}>
                    <MypageMenu active={active}/>
                </section>
                <section className={styles.content}>
                    <div className={styles.status_wrap}>
                        <ul>
                            <li className={!status ? styles.all : ""} onClick={()=>handleChangeStatus()}>전체</li>
                            <li className={status === 'progress' ? styles.progress : ""} onClick={()=>handleChangeStatus('progress')}>투표중</li>
                            <li className={status === 'end' ? styles.end : ""} onClick={()=>handleChangeStatus('end')}>투표종료</li>
                        </ul>
                    </div>
                    <div className={styles.postNum}>총 <span style={{color: '#ac2323'}}>{postsNum}</span> 개의 게시글</div>
                    <List posts={posts} postsNum={postsNum} postsPerPage={10} page={page}/>
                </section>
            </div>
        </div>
    )
}

export default Mypost;