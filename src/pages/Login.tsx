import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = useState("");

  useEffect(() => {
    const playerId = localStorage.getItem("playerId");
    if (playerId) {
      navigate("/");
    }
  }, [navigate]);

  const [result, setResult] = useState<any>(null);

  /**
   * テストサーバーアクセス
   * @returns
   */
  const getMyTestServer = async () => {
    try {
      const res = await axios.get("https://aideatool.ddns.net/api/");
      setResult(res.data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const login = () => {
    localStorage.setItem("playerId", playerId);
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="player id"
        value={playerId}
        onChange={(e) => {
          setPlayerId(e.target.value);
        }}
      />
      <button onClick={login}>Login</button>
      <button onClick={getMyTestServer}>APIアクセス</button>
      <p>{result ? result : "データなし"}</p>
    </div>
  );
};
export default Login;
