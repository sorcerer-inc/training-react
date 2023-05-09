import axios from "axios";
import { useState } from "react";
import { PlayerItem } from "../types/playerItem";

const PlayerItems = () => {
    const [playerItems, setPlayerItems] = useState<PlayerItem[]>([]);
    const [inputs,setInputs] = useState<number[]>([]);
    
    const fetchData = async () => {
      const playerId = localStorage.getItem("playerId");
      try {
        const res = await axios.get(`http://localhost:3000/playerItems/readPlayerItemById/${playerId}`);
        const data = res.data;
        console.log(data);
        return data;
      } catch (e) {
        console.log(e);
        return null;
      }
    };
  
    const getAPI = async () => {
      const result:PlayerItem[] = await fetchData();
      if (result == null) {
      } else {
        setPlayerItems(result);
      }

      const arr = new Array(playerItems.length).fill(1);
      setInputs(arr);
    };
    
    const CountChange = (event:any,itemId:number) => {
      setInputs(inputs.map((input,index) => (index === (itemId-1) ? event.target.value : input)));
    }

    const itemUse = async (itemId:number) => {
        const playerId = localStorage.getItem("playerId");
        const body = {
            "itemId": itemId,
            "count": inputs[itemId-1]
        }
        try {
            await axios.post(`http://localhost:3000/playerItems/useItem/${playerId}`,body);
        } catch (e) {
            console.log(e);
            return null;
        } finally {
          getAPI();
        }
    }
  
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>PlayerItems</h2>
        <button onClick={getAPI}>show PlayerItems</button>
        <table>
          <thead>
            <tr>
              <th>player_id</th>
              <th>item_id</th>
              <th>count</th>
              <th>使いたい数</th>
            </tr>
          </thead>
          <tbody>
            {/* TODO 取得したデータ表示 */}
            {playerItems.map((playerItem,index) => (
            <tr>
                <td>{playerItem.playerId}</td>
                <td>{playerItem.itemId}</td>
                <td>{playerItem.count}</td>
                <td><input type="number" min={1} max={playerItem.count} value={inputs[index]} onChange={(event) => CountChange(event,playerItem.itemId)}></input></td>
                <td><button onClick={() => itemUse(playerItem.itemId)}>use</button></td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default PlayerItems;