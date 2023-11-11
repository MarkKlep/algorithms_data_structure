class DunamicArray {
    constructor() {
        this.data = {};
        this.length = 0;
    }

    pushBack(value) {
        this.data[this.length++] = value;
    }

    get(index) {
        if(index < 0 || index > this.length - 1) {
            return -1;
        }

        return this.data[index];
    }

    popBack() {
        if(this.length)
            delete this.data[--this.length]
    }

    print() {
        for(let i = 0; i < this.length; i++) {
            console.log(this.data[i]);
        }
    }
}

const arr = new DunamicArray();

arr.pushBack(1);
arr.pushBack(2);
arr.pushBack(3);
arr.pushBack(4);
arr.pushBack(5);

arr.print();

arr.popBack();
arr.popBack();
arr.popBack();
arr.popBack();

arr.print();