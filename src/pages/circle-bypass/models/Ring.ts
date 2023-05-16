export class Ring {
  #centerSectionGap = 132;
  #ringThickness = 60;
  #gap = 12;

  constructor(public index: number) { }

  get radiusInner() {
    return this.#centerSectionGap + (this.#gap + this.#ringThickness) * this.index;
  }

  get radiusOutter() {
    return this.radiusInner + this.#ringThickness;
  }
}