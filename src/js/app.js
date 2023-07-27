import { CheckCard } from "./CheckCard.js";

const cardNumber = "4716310046525812";

function app() {
  // document.body.innerHTML = drawGameField(FILED_LENGTH);
  const cardChecker = new CheckCard();
  const cardSystem = cardChecker.getCardType(cardNumber);
  const algorithm = cardChecker.luhnAlgorithm(cardNumber);

  console.log(cardSystem, algorithm);
}

app();
