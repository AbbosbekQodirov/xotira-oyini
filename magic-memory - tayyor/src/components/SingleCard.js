import React from 'react'
import "./SingleCards.css"

function SingleCard({ card, selectCard, flipped, disabled }) {
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt="front card" />
        <img className='back'
          onClick={() => {
            selectCard(card);
          }}
          src="./img/cover.png"
          alt="front card"
        />
      </div>
    </div>
  );
}

export default SingleCard