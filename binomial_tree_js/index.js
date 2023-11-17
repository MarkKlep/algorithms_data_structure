class Node {
    constructor(_key) {
        this.key = _key;
        this.degree = 0;
        this.child = null;
        this.sibling = null;
        this.parent = null;
    }
}

class BinomialHeap {
    constructor() {
        this.head = null;
    }

    mergeTrees(tree1, tree2) {
        if (!tree1) return tree2;
        if (!tree2) return tree1;
    
        let newHead;
    
        if (tree1.degree <= tree2.degree) {
            newHead = tree1;
            tree1.sibling = this.mergeTrees(tree1.sibling, tree2);
        } else {
            newHead = tree2;
            tree2.sibling = this.mergeTrees(tree2.sibling, tree1);
        }
    
        return newHead;
    }
    
    insert(key) {
        const newTree = new BinomialHeap();
        newTree.head = new Node(key);

        this.union(newTree);
    }

    union(tree) {
        this.head = this.mergeTrees(this.head, tree.head);
        if (!this.head) return;

        let prev = null;
        let x = this.head;
        let next = x.sibling;

        while (next) {
            if (x.degree !== next.degree || (next.sibling && next.sibling.degree === x.degree)) {
                prev = x;
                x = next;
            } 
            else {
                if (x.key < next.key) {
                    x.sibling = next.sibling;
                    this.link(next, x);
                } 
                else {
                    if (!prev) {
                        this.head = next;
                    } 
                    else {
                        prev.sibling = next;
                    }
                    this.link(x, next);
                    x = next;
                }
            }
            next = x.sibling;
        }
    }

    link(y, z) {
        y.parent = z;
        y.sibling = z.child;
        z.child = y;
        z.degree++;
    }

    countNodes(node) {
        if (!node) {
            return 0;
        }

        let count = 1;

        count += this.countNodes(node.child);

        count += this.countNodes(node.sibling);

        return count;
    }

    size() {
        return this.countNodes(this.head);
    }

    remove(key) {
        if (!this.head) return;

        let foundNode = null;
        let prev = null;
        let curr = this.head;

        while (curr) {
            if (curr.key === key) {
                foundNode = curr;
                break;
            }
            prev = curr;
            curr = curr.sibling;
        }

        if (!foundNode) return;

        if (!prev) {
            this.head = foundNode.sibling;
        } else {
            prev.sibling = foundNode.sibling;
        }

        const childHeap = new BinomialHeap();
        childHeap.head = foundNode.child;
        this.union(childHeap);
    }

    countTrees() {
        let nodesAmount = this.size();
        let treeCounter = 0;
        
        while (nodesAmount > 0) {
            if (nodesAmount % 2 === 1) {
                treeCounter++;
            }
            nodesAmount = Math.floor(nodesAmount / 2);
        }

        return treeCounter;
    }
    
    preOrderTraversal(node = this.head, result = []) {
        if (!node) {
            return result;
        }
    
        result.push(node.key);
    
        if (node.child) {
            this.preOrderTraversal(node.child, result);
        }
    
        if (node.sibling) {
            this.preOrderTraversal(node.sibling, result);
        }
    
        return result;
    }
    

    displayStructure() {
        if (!this.head) {
            console.log("Binomial Heap is empty.");
            return;
        }
    
        this.displayStructureRecursive(this.head, 0);
    }
    
    displayStructureRecursive(node, level) {
        if (!node) {
            return;
        }
    
        let output = "";
        for (let i = 0; i < level; i++) {
            output += "--";
        }
    
        console.log(output + `Key: ${node.key}, Level: ${level}`);
    
        if (node.child) {
            this.displayStructureRecursive(node.child, level + 1);
        }
    
        if (node.sibling) {
            this.displayStructureRecursive(node.sibling, level);
        }
    }
    
}

const binomialHeap = new BinomialHeap();
const readlineSync = require("readline-sync");

while(true) {

    menu();

    console.log(binomialHeap.preOrderTraversal());

    console.log();

    readlineSync.keyInPause();
}

function menu() {
    const select = ['insert', 'remove', 'size', 'tree in heap', 'display', 'exit'];

    const action = readlineSync.keyInSelect(select, "Action: ");

    switch(action) {
        case 0:
            const data = readlineSync.question("Inserted key = ");
            binomialHeap.insert(data);
            console.clear();
            break;

        case 1: 
            const keyToRemove = readlineSync.question("Removed key = ");
            binomialHeap.remove(keyToRemove);
            console.clear();
            break;

        case 2:
            console.log("Nodes amount = " + binomialHeap.size());
            readlineSync.keyInPause();
            console.clear();
            break;

        case 3:
            console.log("Trees amount in decimal = " + binomialHeap.countTrees());
            console.log("Nodes amount in binary === tree representation = " + binomialHeap.size().toString(2));
            readlineSync.keyInPause();
            console.clear();
            break;

        case 4:
            binomialHeap.displayStructure();
            readlineSync.keyInPause();
            console.clear();
            break;

        case 5: 
            console.clear();
            process.exit();

        default:
            console.clear();
            console.log("Invalid choice. Please enter a valid option.");
    }
}