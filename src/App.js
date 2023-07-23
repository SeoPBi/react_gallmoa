import React, { useState, useEffect } from 'react';
import { FaFutbol, FaUsers, FaMapMarkerAlt, FaUserFriends, FaUserCircle } from 'react-icons/fa';
import './App.css';

const images = [
  'img/01.jpg',
  'img/02.jpg',
  'img/03.jpg',
  'img/04.jpg',
  'img/05.jpg',
];

function getDatesFromToday(days) {
  const dates = [];
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null); // 새로운 상태 변수 추가
  const timelineDates = getDatesFromToday(16);

  useEffect(() => {
    // 슬라이드 전환을 위한 타이머 함수 설정
    const slideShowTimer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);

    // 컴포넌트가 unmount될 때 타이머 함수 정리
    return () => clearInterval(slideShowTimer);
  }, []);

  // 날짜를 클릭했을 때 호출되는 함수
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/" className="App-title">
          골모아
        </a>
        <div className="right-menu">
          <input
            type="text"
            className="search-input"
            placeholder="지역, 구장 이름으로 찾기"
          />
          <a className="login-link" href="/login">
            <FaUserCircle size={20} /> 로그인
          </a>
        </div>
      </header>
      <main>
        <div className="button-container">
          <button className="main-button">
            <FaFutbol size={24} /> 소셜 매치
          </button>
          <button className="main-button">
            <FaUsers size={24} /> 팀 매치
          </button>
          <button className="main-button">
            <FaMapMarkerAlt size={24} /> 구장 예약
          </button>
          <button className="main-button">
            <FaUserFriends size={24} /> 팀
          </button>
          <button className="main-button">
            <FaUsers size={24} /> 게스트 모집
          </button>
        </div>

        {/* 이미지 슬라이드 쇼 */}
        <div className="slideshow-container">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={image} alt={`Slide ${index}`} className="ad-image" />
            </div>
          ))}
        </div>

        {/* 타임라인 */}
        <div className="timeline">
          {timelineDates.map((date, index) => (
            <div
              key={index}
              className={`timeline-date ${selectedDate === date ? 'selected' : ''}`} // 선택된 날짜에 스타일을 추가할 클래스
              onClick={() => handleDateClick(date)} // 클릭 이벤트 처리 함수 호출
            >
              {date.toLocaleDateString('ko-KR', {
                month: '2-digit',
                day: '2-digit',
              }).replace('.', '/').trim()}
            </div>
          ))}
        </div>

        {/* 선택된 날짜 정보 보여주는 컴포넌트 */}
        {selectedDate && (
          <div className="selected-date-info">
            선택한 날짜: {selectedDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p>© 2023 Gallmoa Website. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
