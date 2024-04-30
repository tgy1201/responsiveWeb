import React, { useEffect, useState } from "react";
import styles from './view.module.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import Comment from "../../component/comment/Comment";

import { IoHeartOutline, IoEyeOutline } from "react-icons/io5";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";


const boardNameMap = {
    all: '전체',
    hot: 'HOT',
    food: '음식',
    love: '연애',
    fashion: '패션',
    hobby: '취미',
    work: '취업',
    travel: '여행',
    etc: '기타',
};

function View({setCategory}) {
    const {bname, postId} = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isOpenResult, setIsOpenResult] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]); //사용자가 선택한 투표옵션
  
    const handleOptionChange = (index) => {
      if (post.multiple) {
        if (selectedOptions.includes(index)) {
          setSelectedOptions(selectedOptions.filter((o) => o !== index));
        } else {
          setSelectedOptions([...selectedOptions, index]);
        }
      } else {
        setSelectedOptions([index]);
      }
    };

    const handleVoteSubmit = () => {
        if (selectedOptions.length === 0) {
            alert("투표옵션을 선택해주세요");
            return;
        }
        console.log(selectedOptions, post.id)
    }
    
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const postresponse = await axios.get("/assets/data/posts.json");
            const postData = postresponse.data.posts.find(post=>post.id === parseInt(postId));

            const commentsResponse = await axios.get("/assets/data/comments.json");
            const commentsData = commentsResponse.data.comments.filter(comment=>comment.postId === parseInt(postId))

            setPost(postData);
            setComments(commentsData);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchPost();
    }, [postId]);

    useEffect(() => {  
        setCategory(bname);
    }, [bname, setCategory]);

    return (
        <div className={styles.container}>
            {post? (
                <div className={styles.view_wrap}>
                    <div className={styles.board_title_wrap}>
                        <h1>{boardNameMap[bname]}</h1>           
                    </div>
                    <div className={styles.post_wrap}>
                        <section className={styles.postInfo_wrap}>
                            <div className={styles.profile_wrap}>
                                <img src={post.profile} alt="프로필"/>
                            </div>
                            <div className={styles.user_wrap}>
                                <p>{post.user}</p>
                                <p>{post.date}</p>
                            </div>
                            <ul>
                                <li style={{color: "#b00000"}}><div><IoHeartOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.like}</div></li>
                                <li style={{color: "#412ed1"}}><div><LiaCommentDotsSolid style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.comment}</div></li> 
                                <li style={{color: "5a5a5a"}}><div><IoEyeOutline style={{verticalAlign: "middle", marginRight: "2px"}}/>{post.view}</div></li>
                            </ul>
                        </section>
                        <section className={styles.voteInfo_wrap}>
                            <div className={styles.voteInfo}>
                                <section className={styles.state_wrap}>
                                    <div style={{backgroundColor: post.state === '투표중'? "#ac2323" : "gray"}}>{post.state}</div>
                                </section>
                                <section className={styles.voteTitle_wrap}>
                                    <p>Q. {post.title}</p>
                                    <div>{post.deadline} 종료</div>
                                </section>
                                <section className={styles.vote_wrap}>                          
                                    <div>단일 선택</div>
                                    <div><FaUser style={{verticalAlign: "middle", marginRight: "5px"}}/><span style={{color: "#ac2323", fontWeight: "600"}}>{post.votes}</span> 명 참여</div>
                                    <table className={styles.vote_table}>
                                        <tbody>
                                        {Object.values(post.option).map((option, idx)=>    
                                            <tr key={idx}>
                                                {isOpenResult || post.state==="투표종료" || post.voted ?
                                                    <td style={{border: "1px solid gray"}}>
                                                        <div className={styles.result_wrap} style={{width: `${option.percent}%`}}>
                                                            {option.img !== '' && 
                                                            <div className={styles.option_img}>
                                                                <img src={option.img} alt="옵션" />
                                                            </div>
                                                            } 
                                                        </div>
                                                        <p className={option.img? `${styles.text}`: `${styles.text2}`}>
                                                            {option.text}
                                                        </p>
                                                        <span className={styles.percent}>{option.percent}%</span>
                                                    </td>
                                                :   <td className={selectedOptions.includes(idx) ? `${styles.selected}` : `${styles.unselected}`} onClick={()=>handleOptionChange(idx)}>
                                                        <div className={styles.option_wrap} >
                                                            {option.img !== '' && 
                                                            <div className={styles.option_img}>
                                                                <img src={option.img} alt="옵션" /> 
                                                            </div>} 
                                                            <p>{option.text}</p>
                                                        </div>
                                                    </td>
                                                }
                                            </tr> 
                                        )}
                                        </tbody>
                                    </table>
                                    <div className={styles.resultBtn_wrap}>
                                        {post.state === "투표종료" ?
                                            <div>이미 종료된 투표입니다.</div>
                                        : post.voted?
                                            <div>이미 완료한 투표입니다.</div>
                                        : !isOpenResult ?
                                        <>
                                            <button className={styles.quick_vote} onClick={handleVoteSubmit} style={{color: selectedOptions.length !== 0 ? "#5a5a5a" : "#a9a9a9"}}>빠른 투표</button>
                                            <button className={styles.result_vote} onClick={()=>setIsOpenResult(true)}>결과 보기</button>
                                        </>
                                        :   <button className={styles.go_vote} onClick={()=>setIsOpenResult(false)}>투표하러가기</button>
                                        }       
                                        </div>
                                </section>
                            </div>
                            <section className={styles.content_wrap}>
                                {post.content}
                            </section>
                            <section className={styles.like_wrap}>
                                <button>♥ 좋아요 {post.like}</button>
                            </section>
                        </section>
                    </div>
                    <Comment comments={comments} />
                </div>
            ) : (
                <p>로딩 중...</p>
            )}
        </div>
    )
}

export default View;