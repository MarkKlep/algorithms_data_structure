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

int main() {

    Solution sol;

    cout << sol.romanToInt("MMIV");

	return 0;
}