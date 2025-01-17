import React, { useState, useEffect, useRef } from 'react';
import {Col, Container, Nav, Row} from 'react-bootstrap';
import {Link, Outlet} from 'react-router-dom';

import Header from "../front/component/Header";
import Footer_2 from "../front/component/Footer_2";
import axios from "axios";

export default function UserInfo() {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const [userInfo, setUserInfo] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);


// 유저 정보 요청
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:8080/test/user", {
                    headers: {
                        Authorization: `Bearer ${token}` // 토큰을 요청 헤더에 첨부합니다.
                    }
                });
                const userData = response.data;  // 응답에서 유저 정보 추출
                setUserInfo(userData);           // 유저 정보를 userInfo에 저장
            } catch (error) {
                console.error("유저 정보 요청 실패:", error);
            }
        };

        fetchUserInfo().then(r => r);
    }, [token]);


    const toggleSidebar = () => {
        setSidebarOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleWheelEvent = (event) => {
            if (sidebarOpen) {
                event.stopPropagation();
            }
        };

        const sidebarElement = sidebarRef.current;
        if (sidebarElement) {
            sidebarElement.addEventListener('wheel', handleWheelEvent, { passive: false });
        }

        return () => {
            if (sidebarElement) {
                sidebarElement.removeEventListener('wheel', handleWheelEvent);
            }
        };
    }, [sidebarOpen]);

    return (
        <>
            <Header /> {/* 여기에 헤더 컴포넌트 추가 */}
            <main>
                <Container>
                    <Row>
                        <Col lg={2} className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                            <div style={{height:"77px"}}></div>
                            <ul className="border border-1" id="infoSideBar">
                                <Link to="/myinfo/modify" style={{textDecoration:"none", color:"black"}}><li className="border-bottom py-2 ps-2" value="modify">내 정보 수정</li></Link>
                                <Link to="/myinfo/like" style={{textDecoration:"none", color:"black"}}><li className="border-bottom py-2 ps-2" value="like">찜 목록</li></Link>
                                <Link to="/myinfo/paylist" style={{textDecoration:"none", color:"black"}}><li className="border-bottom py-2 ps-2">결재내역</li></Link>
                                {userInfo.type !== "user"
                                    ?
                                    <Link to="/myinfo/classlist" style={{textDecoration:"none", color:"black"}}><li className="py-2 ps-2">클래스 관리</li></Link>
                                    :
                                    <></>
                                }
                            </ul>
                        </Col>
                        <Col lg={10}>
                            <Outlet context={userInfo} />
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer_2 />
        </>
    );
}