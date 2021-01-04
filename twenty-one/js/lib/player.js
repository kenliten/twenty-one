class Player {
  name;
  constructor(name) {
    this.name = name;
  }

  play(choice) {
    record({ player: this.name, choice: choice });
  }
}