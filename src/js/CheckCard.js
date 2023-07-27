export class CheckCard {
  luhnAlgorithm(cardNumber) {
    let check_digit = 0;
    for (let i = cardNumber.length - 2; i >= 0; --i) {
      check_digit +=
        (i & 1) === 0
          ? Number(cardNumber[i]) > 4
            ? Number(cardNumber[i]) * 2 - 9
            : Number(cardNumber[i]) * 2
          : Number(cardNumber[i]);
    }

    return 10 - (check_digit % 10) === Number(cardNumber.slice(-1));
  }

  getCardType(cardNumber) {
    const cardTypes = {
      Mir: {
        numbers: Array.from({ length: 2204 - 2200 }, (_, i) => i + 2201),
        length: [16, 17, 18, 19],
      },
      AmericanExpress: { numbers: [34, 37], length: [15] },
      Visa: { numbers: [4], length: [13, 16, 19] },
      MasterCard: {
        numbers: [
          51,
          52,
          53,
          54,
          55,
          ...Array.from({ length: 2720 - 2221 }, (_, i) => i + 2721),
        ],
        length: [16],
      },
      UnionPay: { numbers: [62], length: [16, 17, 18, 19] },
      JCB: {
        numbers: Array.from({ length: 3589 - 3527 }, (_, i) => i + 3528),
        length: [16, 17, 18, 19],
      },
      DinersClub: { numbers: [36, 54], length: [14, 15, 16, 17, 18, 19] },
      Maestro: {
        numbers: [
          6759, 676770, 676774, 5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762,
          6763,
        ],
        length: [12, 13, 14, 15, 16, 17, 18, 19],
      },
      Discover: {
        numbers: [6011, 644, 645, 646, 647, 648, 649, 65],
        length: [16, 17, 18, 19],
      },
    };
    const possibleCardSystems = [];

    for (const cardSystem in cardTypes) {
      if (
        cardTypes[cardSystem].numbers.some((cardIIN) => {
          if (cardNumber.startsWith(cardIIN.toString())) {
            return cardTypes[cardSystem].length.some(
              (cardLength) => cardNumber.length === cardLength,
            );
          } else {
            return false;
          }
        })
      ) {
        possibleCardSystems.push(cardSystem);
        break;
      }
    }
    return possibleCardSystems.length === 1
      ? possibleCardSystems[0]
      : "Unknown card type";
  }
}
