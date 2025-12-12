import { useState } from "react";
import "./App.css";

function App() {
  // 내가 입력한 기록
  const [myTime, setMyTime] = useState(""); // myTime은 현재 값(상태) , setMyTime :상태를 변경하는 함수-> myTime의 값을 바꾸고 render을 요청              

  // 더미데이터 (임시 랭킹)
  const dummyData = [
    { name: "민수", time:Math.floor((Math.random() * 10 + 10) * 10) / 10 }, // 10~20 사이의 랜덤 값
    { name: "철수", time: Math.floor((Math.random() * 10 + 10) * 10) / 10  },
    { name: "영희", time: Math.floor((Math.random() * 10 + 10) * 10) / 10 } ,
  ];

  // 전체 순위 (나 포함)
  const [ranking, setRanking] = useState([]);

  // 순위 계산 함수
  const calculateRanking = () => {
    if (!myTime) return;

    const myRecord = { name: "나", time: Number(myTime) };
    const newList = [...dummyData, myRecord].sort((a, b) => a.time - b.time);

    // sort(a,b)는 앞에서 부터 차근차근 비교을 해서 정렬을 하는 거임
    // 작은 순서대로 앞에 먼저 나오게 정렬이 된다.

    setRanking(newList); // 여기에서 ranking에 값이 실제로 입력이된다.
  };

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
          // e 는 그냥 객체
          // setMyTime(e.target.value) => myTime값으로 들어감
          // e.target.value는 사용자가 입력하는 값
        />
        <button onClick={calculateRanking}>순위 보기</button>
      </div>
      
      {ranking.length > 0 && (
        <div className="ranking-box">
          <h2>🏆 순위</h2>
            {ranking.map((r, i) => ( //r : ranking list, i : 인덱스
              <li key={i}>
                <strong>{i + 1}위</strong> — {r.name} ({r.time}분)
              </li>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
