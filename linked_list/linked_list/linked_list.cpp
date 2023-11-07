#include <iostream>
#include <list>

using namespace std;

template<typename T>
class LinkedList {

    template<typename T>
    struct Node {
        T data;
        Node<T>* prev;
        Node<T>* next;

        Node(T _data = T()) {
            data = _data;
            prev = nullptr;
            next = nullptr;
        }
    };

    Node<T>* head;
    Node<T>* tail;

public:
    LinkedList() {
        head = tail = nullptr;
    }

    ~LinkedList() {
        Node<T>* curr = head;
        while (curr) {
            Node<T>* temp = curr;
            curr = curr->next;
            temp->prev = nullptr;
            delete temp;
        }
        head = tail = nullptr;
    }

    void clear() {
        Node<T>* curr = head;
        while (curr) {
            Node<T>* temp = curr;
            curr = curr->next;
            temp->prev = nullptr;
            delete temp;
        }
        head = tail = nullptr;
    }

    void push_back(T data) {
        if (head == nullptr) {
            head = tail = new Node<T>(data);
            return;
        }

        Node<T>* node = new Node<T>(data);

        tail->next = node;
        node->prev = tail;

        tail = node;
    }

    void push_front(T data) {
        if (head == nullptr) {
            head = tail = new Node<T>(data);
            return;
        }

        Node<T>* node = new Node<T>(data);

        head->prev = node;
        node->next = head;

        head = node;
    }

    void pop_front() {
        if (head == nullptr) {
            return;
        }

        if (head == tail) {
            Node<T>* temp = head;
            head = tail = nullptr;
            delete temp;

            return;
        }

        Node<T>* temp = head;

        head = head->next;
        head->prev = nullptr;

        temp->next = nullptr;
        delete temp;
    }

    void pop_back() {
        if (head == nullptr) {
            return;
        }

        if (head == tail) {
            delete head;
            head = tail = nullptr;
            return;
        }

        Node<T>* temp = tail;

        tail = tail->prev;
        tail->next = nullptr;

        temp->prev = nullptr;
        delete temp;
    }

    void display() {
        Node<T>* curr = head;

        while (curr) {
            cout << curr->data << " --> ";
            curr = curr->next;
        }
        cout << endl;
    }

    void insert(const unsigned int index, T data) {
        if (head == nullptr) {
            head = tail = new Node<T>(data);
            return;
        }

        Node<T>* curr = head;

        unsigned int counter = 0;

        while (curr->next && counter != index) {
            curr = curr->next;
            counter++;
        }

        if (counter != index) {
            cout << "Index: " << index << " is out of range" << endl;
            return;
        }

        Node<T>* node = new Node<T>(data);

        if (curr->next) {

            Node<T>* nextCurr = curr->next;

            curr->next = node;
            node->prev = curr;

            nextCurr->prev = node;
            node->next = nextCurr;

            return;
        }
        
        curr->next = node;
        node->prev = curr;
    }

    void remove(const unsigned int index) {
        if (!head) {
            cout << "List is empty" << endl;
            return;
        }

        Node<T>* curr = head;
        unsigned int counter = 0;

        while (curr->next && counter != index) {
            curr = curr->next;
            counter++;
        }


        if (counter != index) {
            cout << "Index: " << index << " is out of range" << endl;
            return;
        }

        if (!curr->next) {
            pop_back();
            return;
        }

        if (!counter) {
            pop_front();
            return;
        }

        Node<T>* temp = curr;

        Node<T>* nextCurr = curr->next;
        Node<T>* prevCurr = curr->prev;

        curr->next = curr->prev = nullptr;

        prevCurr->next = nextCurr;
        nextCurr->prev = prevCurr;

        delete temp;

    }

};

int main() {
    
    LinkedList<int> _list;

    _list.push_back(1);
    _list.push_back(7);
    _list.push_back(4);
    _list.push_back(2);

    _list.remove(2);

    _list.display();
    





    return 0;
}