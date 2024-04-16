import React from "react";
import styles from './mypageMenu.module.css'
import { Link } from "react-router-dom";

function MypageMenu ({active}) {
    
    return (
        <>
            <div className={styles.pc}>
                <h2>마이페이지</h2>
                <ul className={styles.menu_list}>
                    <li><Link to="/mypage" className={active===1? styles.active : ""}>마이페이지 홈</Link></li>
                    <li><Link to="/" className={active===2? styles.active : ""}>회원정보 수정</Link></li>
                    <li><Link to="/" className={active===3? styles.active : ""}>작성한 글</Link></li>
                    <li><Link to="/" className={active===4? styles.active : ""}>작성한 댓글</Link></li>
                    <li><Link to="/" className={active===5? styles.active : ""}>좋아요한 글</Link></li>
                </ul>
            </div>
            <div className={styles.mobile}>
                <div className={styles.menu_list}>
                    <div><Link to="/mypage" className={active===1? styles.active : ""}>마이페이지 홈</Link></div>
                    <div><Link to="/" className={active===2? styles.active : ""}>회원정보 수정</Link></div>
                    <div><Link to="/" className={active===3? styles.active : ""}>작성한 글</Link></div>
                    <div><Link to="/" className={active===4? styles.active : ""}>작성한 댓글</Link></div>
                    <div><Link to="/" className={active===5? styles.active : ""}>좋아요한 글</Link></div>
                </div>
            </div>
        </>
    )
}

export default MypageMenu;