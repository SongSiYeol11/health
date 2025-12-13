import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [myTime, setMyTime] = useState(""); // 입력값
  const [ranking, setRanking] = useState([]); // 전체 순위
  const [myRecords, setMyRecords] = useState([]); // 내 기록 리스트

  // 더미데이터
  const dummyData = [
    { name: "민수", time: Math.floor((Math.random() * 10 + 10) * 10) / 10 },
    { name: "철수", time: Math.floor((Math.random() * 10 + 10) * 10) / 10 },
    { name: "영희", time: Math.floor((Math.random() * 10 + 10) * 10) / 10 },
  ];

  // 순위 계산 + localStorage 저장
  const calculateRanking = () => {
    if (!myTime) return;

    const myRecord = { name: "나", time: Number(myTime), date: new Date().toLocaleString() };
    const newList = [...dummyData, myRecord].sort((a, b) => a.time - b.time);
    setRanking(newList);

    // 내 기록 리스트 업데이트
    const updatedRecords = [...myRecords, myRecord];
    setMyRecords(updatedRecords);

    // localStorage 저장
    localStorage.setItem("myRecord", JSON.stringify(updatedRecords));
  };

  // 처음 로드 시 localStorage에서 기록 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("myRecord");
    if (saved) {
      const records = JSON.parse(saved);
      setMyRecords(records);

      // 마지막 기록 불러오기
      if (records.length > 0) {
        setMyTime(records[records.length - 1].time);
      }
    }
  }, []); // 빈 배열: 처음 한 번만 실행

  return (
    <div className="container">
      <h1>🏃 달리기 순위 앱</h1>

      <div className="input-box">
        <label>내 달리기 기록 (분):</label>
        <input
          type="number"
          value={myTime}
          placeholder="예: 12.3"
          onChange={(e) => setMyTime(e.target.value)}
        />
        <button onClick={calculateRanking}>순위 보기</button>
      </div>

      {ranking.length > 0 && (
        <div className="ranking-box">
          <h2>🏆 순위</h2>
          <ul>
            {ranking.map((r, i) => (
              <li key={i}>
                <strong>{i + 1}위</strong> — {r.name} ({r.time}분)
              </li>
            ))}
          </ul>
        </div>
      )}

      {myRecords.length > 0 && (
        <div className="history-box">
          <h2>📘 내 기록 히스토리</h2>
          <ul>
            {myRecords.map((r, i) => (
              <li key={i}>
                {r.date} — {r.time}분
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
