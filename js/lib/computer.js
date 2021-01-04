class Computer {

  name;

  constructor(name) {
    this.name = name;
  }

  play() {
    let choice, cc;

    if (runningTotal < 14) {
      cc = Math.round(Math.random() * 3)
      choice = cc == 0 ? 1 : cc;
    } else if(runningTotal == 18) {
      choice = 3;
    } else if (runningTotal == 14) {
      choice = 3;
    } else if (runningTotal == 15) {
      choice = 2;
    } else if (runningTotal > 18) {
      choice = 21 - runningTotal;
    } else if (runningTotal == 17) {
      cc = Math.round(Math.random() * 3);
      choice = cc == 0 ? 1 : cc;
    } else if (runningTotal == 16) {
      choice = 1;
    }

    record({ player: this.name, choice: choice });

    return choice;
  }

}