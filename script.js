const board = document.getElementById("gameBoard");
    const winnerMessage = document.getElementById("winnerMessage");
    const symbols = ['🍎','🍌','🍇','🍓','🍒','🍍','🥝','🍉'];
    let deck = [];
    let flippedCards = [];
    let matched = [];

    function createCard(symbol, index) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.symbol = symbol;
      card.dataset.index = index;
      card.addEventListener('click', handleFlip);
      return card;
    }

    function handleFlip(e) {
      const card = e.currentTarget;
      if (card.classList.contains('flipped') || flippedCards.length === 2) return;
      card.classList.add('flipped');
      card.textContent = card.dataset.symbol;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        const [first, second] = flippedCards;
        if (first.dataset.symbol === second.dataset.symbol) {
          first.classList.add('matched');
          second.classList.add('matched');
          matched.push(first.dataset.symbol);
          flippedCards = [];

          if (matched.length === symbols.length) {
            setTimeout(() => {
              winnerMessage.innerHTML = `<button id="restartAfterWinBtn" onclick="setupGame()">🎉 Restart Game</button>`;
            }, 500);
          }
        } else {
          setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            first.textContent = '';
            second.textContent = '';
            flippedCards = [];
          }, 800);
        }
      }
    }

    function setupGame() {
      deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
      flippedCards = [];
      matched = [];
      winnerMessage.textContent = '';
      board.innerHTML = '';
      deck.forEach((symbol, i) => {
        const card = createCard(symbol, i);
        board.appendChild(card);
      });
    }

    setupGame();