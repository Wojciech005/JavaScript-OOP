class Game {
    constructor() {
        this.stats = new Statisctics();
        this.wallet = new Wallet(100);

        document.getElementById('start').addEventListener('click', this.startGame.bind(this));
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.boards = [...document.querySelectorAll('div.color')];
        this.inputBid = document.getElementById('bid');
        this.spanResult = document.querySelector('.score span.result')
        this.spanGames = document.querySelector('.score span.number')
        this.spanWins = document.querySelector('.score span.win')
        this.spanLosses = document.querySelector('.score span.loss')

        this.render()
    }
    render(colors = ['gray', 'gray', 'gray'], money = this.wallet.getWalletValue(), result = "", stats = [0, 0, 0], bid = 0, wonMoney = 0) {
        // console.log('gramy')

        this.boards.forEach((board, index) => {
            board.style.backgroundColor = colors[index]
        })

        this.spanWallet.textContent = money;
        if (result) {
            result = `Wygrales ${wonMoney}$.`;
        } else if (!result && result !== "") {
            result = `Przegrales ${bid}$.`
        }

        this.spanResult.textContent = result;
        this.spanGames.textContent = stats[0];
        this.spanWins.textContent = stats[0];
        this.spanLosses.textContent = stats[0];
        this.inputBid.value = ""

    }
    startGame() {
        if (this.inputBid.value < 1) return alert('no much money to play')
        const bid = Math.floor(this.inputBid.value)

        if (!this.wallet.checkCanPlay(bid)) {
            return alert('no much money to play or used wrong value')
        }

        this.wallet.changeWallet(bid, '-')

        this.draw = new Draw()
        const colors = this.draw.getDrawResault();
        const win = Result.checkWiner(colors)
        const wonMoney = Result.moneyWithInGame(win, bid)
        // console.log(wonMoney)
        this.wallet.changeWallet(wonMoney);
        this.stats.addGameToStatictics(win, bid)

        this.render(colors, this.wallet.getWalletValue(), win, this.stats.showGameStatisctics, bid, wonMoney)
    }
}