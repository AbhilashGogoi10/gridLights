import "./index.css";
import { useState } from "react";

function Cell({ filled, onClick, isDisabled, label }) {
  return (
    <button
      type="button"
      aria-label={label}
      isDisabled={isDisabled}
      onClick={onClick}
      className={filled ? "cell cell-activated" : "cell"}
    />
  );
}


function App() {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const config = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  
const deactiveCells = ()=>{
  setIsDeactivating(true);
  const timer = setInterval(() => {
    setOrder((oriOrder)=>{
      const newOrder = oriOrder.slice();
      newOrder.pop();
  
      if(newOrder.length === 0){
        clearInterval(timer);
        setIsDeactivating(false);
      }
  
      return newOrder;

    })
   
  }, 300);
}

const activateCells = (index) => {
  const newOrder = [...order, index];
  setOrder(newOrder);


  if(newOrder.length === config.flat(1).filter(Boolean).length){
    deactiveCells();
  }
};

  return (
    <div className="wrapper">
      <div className="grid" style={{gridTemplateColumns:`repeat(${config[0].length}, 1fr)`,}}>
        {config.flat(1).map((value, index) => {
          return (
            value? ( <Cell
            label={`Cell ${index}`}
              key={index}
              filled={order.includes(index)}
              isDisabled = {order.includes(index) || isDeactivating}
              onClick={() => activateCells(index)}
            /> )
           : (<span/>)
          );
        })}
      </div>
    </div>
  );
}

export default App;
