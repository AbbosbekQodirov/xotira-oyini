import "./App.css";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [item, setItem] = useState(0);

  const randomCards = () => {
    document.querySelector(".victory").classList.remove("active");
    const mixedCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => {
        return { ...card, id: Math.random() };
      });
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(mixedCards);
    setTurns(0);
    setItem(0);
  };

  const selectCard = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          setItem(item + 1);
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 800);
      }
    }
  }, [choiceOne, choiceTwo]);
  console.log(item);

  if (item === 6) {
    setTimeout(() => {
      document.querySelector(".victory").classList.add("active");
      console.log("galaba");
    }, 600);
  }

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    randomCards();
  }, []);

  return (
    <div className="App">
      <div className="victory">
        <h4>
          Siz <span>{turns}</span> ta urunishda g'alaba qozondingiz <br />{" "}
          <span>yana o'ynaysizmi</span>
        </h4>
        <button onClick={randomCards} className="btn1">
          OK
        </button>
      </div>
      <h1>Magic Match</h1>
      <button onClick={randomCards}>New Game</button>
      <div className="card-grid">
        {cards &&
          cards.map((card) => {
            return (
              <SingleCard
                card={card}
                key={card.id}
                selectCard={selectCard}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
                disabled={disabled}
              />
            );
          })}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
