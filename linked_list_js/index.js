class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {


    constructor() {
        this.head = null;
    }

    pushBack(data) {
        if(!this.head) {
            this.head = new Node(data);
            return;
        }

        let curr = this.head;

        while(curr.next) {
            curr = curr.next;
        }

        curr.next = new Node(data);
    }

    display() {
        let curr = this.head;

        while (curr) {
          process.stdout.write(curr.data.toString());
      
          if (curr.next) {
            process.stdout.write(" -> ");
          }
      
          curr = curr.next;
        }
    }

    popBack() {
        if(!this.head) {
            return;
        }

        if(!this.head.next) {
            this.head = null;
            return
        }

        let curr = this.head;
        let prev = null;

        while(curr.next) {
            prev = curr;
            curr = curr.next;
        }

        prev.next = null;
    }

    insert(index, data) {
        let node = new Node(data);
    
        if (!this.head || !index) {
            node.next = this.head;
            this.head = node;
            return;
        }
    
        let curr = this.head;
        let prev = null;
    
        while (index && curr) {
            prev = curr;
            curr = curr.next;
    
            index--;
        }
    
        prev.next = node;
        node.next = curr;
    }
    
    remove(index) {
        if(index < 0) {
            return;
        }
    
        if(!this.head) {
            return;
        }
    
        if(!this.head.next) {
            this.head = null;
            return;
        }
    
        if(!index) {
            let temp = this.head;
    
            this.head = this.head.next;
    
            temp.next = null;
            temp = null;
    
            return;
        }
    
        let curr = this.head;
        let prev = null;
    
        while (index) {
            prev = curr;
            curr = curr.next;
    
            index--;
    
            if(!curr) return;
        }
    
        prev.next = curr.next;
        curr = null;
    }
    
    
}

const list = new LinkedList();

const readlineSync = require('readline-sync');

while (true) {
    menu();
    console.log('- - - - - - - - - - - -');
    list.display();

    console.log();
    readlineSync.keyInPause();
}

function menu() {

    const select = ['pushBack', 'popBack', 'insert', 'remove', 'exit'];

    const choice = readlineSync.keyInSelect(select, "Which method?");

    switch (choice) {
        case 0:
            const data = readlineSync.question("Enter data to push: ");
            list.pushBack(data);
            console.clear();
            break;

        case 1:
            list.popBack();
            console.clear();
            break;

        case 2:
            const index = readlineSync.question("Enter index to insert: ");
            const _data = readlineSync.question("Enter data to push: ");
            list.insert(index, _data);
            console.clear();
            break;
        
        case 3:
            const _index = readlineSync.question("Enter index to remove: ");
            list.remove(_index);
            console.clear();
            break;

        case 4:
            process.exit();

        default:
            console.clear();
            console.log("Invalid choice. Please enter a valid option.");
    }
}