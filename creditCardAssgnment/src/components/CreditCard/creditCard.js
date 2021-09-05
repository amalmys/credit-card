import "./creditCard.scss";
import React, { useEffect, useState } from "react";
import { getCardType } from "../../utils/cardTypes";
import ReactCardFlip from "react-card-flip";
import card from "../../assets/images/card.jpeg";
import chip from "../../assets/images/chip.png";
// import visa from "../../assets/images/visa.png";
import { Input } from "antd";

const CreditCard = (props) => {
  const [cardImage, setCardImage] = useState();
  const { year, cvv, month, name, cardNumber, cardNumberText, flip } = props;

  useEffect(() => {
    const cardType = getCardType(cardNumber);
    if (cardType)
      import(`../../assets/images/${cardType.toLowerCase()}.png`).then(
        (image) => setCardImage(image.default)
      );
    else
      import(`../../assets/images/visa.png`).then((image) => {
        console.log("img,image", image);
        setCardImage(image.default);
      });
  }, [cardNumber]);

  const creditCardNumber = (cardNumberText) => {
    var numberParts = [];
    var i;
    for (i = 0; i < cardNumberText.length; i += 4) {
      numberParts.push(cardNumberText.substring(i, i + 4));
    }
    return numberParts.join(" ");
  };
  return (
    <div className="credit-card">
      <ReactCardFlip isFlipped={flip} infinite>
        <div
          className="credit-card-parent"
          style={{ backgroundImage: `url(${card})`, backgroundSize: "cover" }}
        >
          <div className="credit-card-top-portion">
            <img src={chip} height="30px" width="39px" />
            <img src={cardImage} height="30px" style={{ maxWidth: "100px" }} />
          </div>
          <div className="credit-card-middle-portion">
            {creditCardNumber(cardNumberText)}
          </div>
          <div className="credit-card-bottom-portion">
            <div className="bottom">
              <span className="bottom-text-label">Card Holder</span>
              <div className="bottom-text-name">{name}</div>
            </div>
            <div className="bottom">
              <span className="bottom-text-label">Expires</span>
              <div className="bottom-text-date">{`${month}/${year}`}</div>
            </div>
          </div>
        </div>
        <div
          className="credit-card-parent-back"
          style={{ backgroundImage: `url(${card})`, backgroundSize: "cover" }}
        >
          <div className="black-portion"></div>
          <div className="cvv-input">
            <div className="cvv-label">CVV</div>
            <Input value={cvv} />
          </div>
          <div className="bottom-image">
            <img src={cardImage} height="30px" style={{ maxWidth: "100px" }} />
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default CreditCard;
