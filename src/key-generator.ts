export class KeyGenerator {
  private nextKeyIndexes: number[] = [0];

  constructor(
    private chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
  ) {}

  public next(): string {
    const r = [];
    //   console.log('this.nextKeyIndexes', this.nextKeyIndexes);
    for (const charIndex of this.nextKeyIndexes) {
      r.unshift(this.chars[charIndex]);
    }
    this.increment();

    return r.join('');
  }

  private increment() {
    for (let i = 0; i < this.nextKeyIndexes.length; i++) {
      const val = ++this.nextKeyIndexes[i];
      if (val >= this.chars.length) {
        this.nextKeyIndexes[i] = 0;
      } else {
        return;
      }
    }

    this.nextKeyIndexes.push(0);
  }
}
