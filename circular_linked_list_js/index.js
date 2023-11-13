class Node {
    constructor(_data) {
        this.data = _data;
        this.next = null;
    }
}


class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    pushBack(data) {
        this.tail = new Node(data);;

        if(!this.head) {
            this.head = this.tail; 
            this.tail.next = this.head;
            return;
        }

        let curr = this.head;
        while(curr.next !== this.head) {
            curr = curr.next;
        }

        curr.next = this.tail;
        this.tail.next = this.head;
    }

    display() {
        if(!this.head) {
            return;
        }

        let curr = this.head;
        while(curr.next !== this.head) {
            console.log(curr.data);
            curr = curr.next;
        }
        console.log(curr.data);
    }

    popFront() {
        if(!this.head) {
            return;
        }

        this.head = this.head.next;
        this.tail.next = this.head;
    }

    removeEveryN(n) {
        if(!this.head) {
            return;
        }

        if(this.head === this.head.next) {
            this.head = null;
            this.head.next = null;
            return;
        }

        let counter = 1;
        let curr = this.head;
        let prev = null;
        do {
            if(counter % n === 0) {
                prev.next = curr.next;
            }
            prev = curr;
            curr = curr.next;
            counter++;
        }
        while(curr !== this.head);
    }
}

const cl = new CircularLinkedList();

cl.pushBack(1);
cl.pushBack(2);
cl.pushBack(3);
cl.pushBack(4);
cl.pushBack(5);
cl.pushBack(6);
cl.pushBack(7);
cl.pushBack(8);
cl.pushBack(9);
cl.pushBack(10);

cl.popFront();

cl.display();

console.log("- - - - - - - - - - - - ");

cl.removeEveryN(7);
cl.display();