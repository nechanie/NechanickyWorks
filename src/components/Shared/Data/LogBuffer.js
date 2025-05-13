export class LogBuffer extends Array {
    constructor(maxLength, ...elements) {
        super(...elements);
        this.maxLength = maxLength;
    }

    push(...elements) {
        elements.forEach((element) => {
            if (this.length >= this.maxLength) {
                this.shift();
            }
            super.push(element);
        });
        return this.length;
    }
}