class Node {
    constructor(_key, _data) {
        this.key = _key;
        this.data = _data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(key, data) {
        this.root = this._insert(this.root, key, data);
    }

    _insert(node, key ,data) {
        if(!node) {
            return new Node(key, data);
        }

        if(key < node.key) {
            node.left = this._insert(node.left, key, data);
        }
        else if(key > node.key) {
            node.right = this._insert(node.right, key, data);
        }

        return node;
    }

    search(key) {
        return this._search(this.root, key);
    }

    _search(node, key) {
        if(!node || node.key === key) {
            return node;
        }
        if(node.key < key) {
            this._search(node.left, key);
        }
        else {
            this._search(node.right, key);
        }
    }

    inOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            this.inOrderTraversal(node.left, result);
            result.push({ key: node.key, data: node.data });
            this.inOrderTraversal(node.right, result);
        }
        return result;
    }

    preOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            result.push({ key: node.key, data: node.data });
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
        return result;
    }

    postOrderTraversal(node = this.root, result = []) {
        if (node !== null) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push({ key: node.key, data: node.data });
        }
        return result;
    }
}

const tree = new BinaryTree();

tree.insert(10, "Data 10");
tree.insert(5, "Data 5");
tree.insert(35, "Data 35");
tree.insert(1, "Data 1");
tree.insert(4, "Data 4");

console.log(tree.search(11));

console.log(tree.postOrderTraversal());

