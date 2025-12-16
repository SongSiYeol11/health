import { useState, useEffect } from "react";
import { supabase } from "./supabase/client";
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

  const calculateRanking = async () => {
  if (!myTime) return;

  const myRecord = {
    name: "나",
    time: Number(myTime),
  };

  // Supabase에 insert
  const { data, error } = await supabase
    .from("records")      // 테이블 이름
    .insert([myRecord]);

  if (error) {
    console.error("Supabase insert error:", error);
    return;
  }

  // 전체 순위 가져오기
  const { data: allRecords, error: fetchError } = await supabase
    .from("records")
    .select("*")
    .order("time", { ascending: true });

  if (fetchError) {
    console.error("Supabase fetch error:", fetchError);
    return;
  }

  setRanking(allRecords);
  setMyRecords(allRecords); // 내 기록 리스트 갱신
};


  // 처음 로드 시 localStorage에서 기록 불러오기
  useEffect(() => {
  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from("records")
      .select("*")
      .order("time", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error);
      return;
    }

    setRanking(data);
    setMyRecords(data);

    if (data.length > 0) {
      setMyTime(data[data.length - 1].time);
    }
  };

  fetchRecords();
}, []);

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
