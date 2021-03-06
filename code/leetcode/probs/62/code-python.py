# 1. DP 1D

class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        
        #m is row number, n is col number
        
        dp = [0]*n
        dp[0] = 1
        
        for r in range(m):
            for c in range(n):
                if c > 0: dp[c] += dp[c-1]
                    
        return dp[-1]
   
# 2. Combinatorics     
# Check Java solution for better implementation

from math import factorial as f
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        return int(f(m+n-2)/f(m-1)/f(n-1))    