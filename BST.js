class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    
    
    insert(data) {
        var root = this.root
        if(!root) {
            this.root = new Node(data);
        }
        else{
            var curr = root;
            var newNode = new Node(data);
            while(curr){
                if(curr.value < data) {
                    if(!curr.right) {
                        curr.right = newNode;
                        break;
                    }
                    else{
                        curr = curr.right;
                    }
                }
                else{
                    if(curr.value > data) {
                        if(!curr.left) {
                            curr.left = newNode;
                            break;
                        }
                        else{
                            curr = curr.left;
                        }
                    }
                }
            }
            
        }
    }

    search(data) {
        var current = this.root;
        while(!current != null){
            if(current.value == data){
                return true;
            }
            else{
                if(data < current.value){
                    current = current.left;
                }
                else{
                    current = current.right;
                }
            }
        }
        return false;
    }
    
}


const newTree = new BST();
newTree.insert(40)
newTree.insert(50)
newTree.insert(90)
newTree.insert(10)
newTree.insert(20)
newTree.insert(1000)
console.log(newTree.search(20))