#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> res;
        for (int i = 0; i < nums.size() - 1; i++) {
            for(int j = i + 1; j < nums.size(); j++) {
                if (nums[i] + nums[j] == target) {
                    res.push_back(i);
                    res.push_back(j);
                    return res;
                }

            }

        }

        return res;
    }

    bool isPalindrome(int x) {

        if (x < 0)
            return false;

        int init_value = x;
        int reversed = 0;

        while (x) {
            int digit = x % 10;

            reversed = digit + reversed * 10;

            x /= 10;
        }

        return reversed == init_value;
    }

    int romanToInt(string s) {

        unordered_map<char, int> map;

        map['I'] = 1;
        map['V'] = 5;
        map['X'] = 10;
        map['L'] = 50;
        map['C'] = 100;
        map['D'] = 500;
        map['M'] = 1000;

        int year = 0;

        for (int i = 0; i < s.length(); i++) {
            if (map[s[i]] < map[s[i + 1]]) {
                year -= map[s[i]];
            }
            else {
                year += map[s[i]];
            }
        }

        return year;
    }
};

template<typename T>
class DynamicArray {
    T* array;
    size_t capacity;
    size_t size;

public:
    DynamicArray() : array(nullptr), size(0), capacity(0) {}

    explicit DynamicArray(size_t _capacity) : capacity(_capacity) {
        array = new T[capacity];
    }

    ~DynamicArray() {
        delete[] array;
    }

    void push_back(const T& value) {
        if (size == capacity) {
            capacity = capacity == 0 ? 1 : capacity * 2;

            T* new_array = new T[capacity];

            for (size_t i = 0; i < size; i++) {
                new_array[i] = array[i];
            }

            delete[] array;

            array = new_array;
        }

        array[size++] = value;
    }

    T& operator[](size_t index) {
        if (index < 0 || index > size - 1) {
            //exit(1);
            throw std::out_of_range("Index out of bounds");
        }

        return array[index];
    }

    void print() {
        for (size_t i = 0; i < size; i++) {
            cout << array[i] << " -> ";
        }
        cout << endl;
    }
};

int main() {

    DynamicArray<int> vec;

    vec.push_back(1);
    vec.push_back(2);
    vec.push_back(3);
    vec.push_back(4);
    vec.push_back(5);


    vec.print();

	return 0;
}