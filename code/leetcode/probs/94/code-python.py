class Solution:
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        
        res = []
        stack = []
        cur = root
        
        while cur or stack:
            while cur:
                stack.append(cur)
                cur = cur.left
            cur = stack.pop()
            res.append(cur.val)
            cur = cur.right
    
        return res