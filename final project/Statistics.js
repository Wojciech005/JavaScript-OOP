


class Statisctics {
constructor() {
    this.gameResult = []
}

addGameToStatictics(win, bid) {
    let gameResult = {
        win: win,
        bid: bid

    }
    console.log(gameResult);
    this.gameResult.push(gameResult)
}
showGameStatisctics() {

    let games = this.gameResult.length
    let wins = this.gameResult.filter(result => result.win).length
    let lossses = this.gameResult.filter(result => !result.win).length
    return [games, wins, lossses]
    console.log(wins, lossses)
}

}

const stats = new Statisctics()