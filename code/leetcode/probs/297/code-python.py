# BFS
class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.
        :type root: TreeNode
        :rtype: str
        """
        out = []
        q = collections.deque([root])
        while q:
            node = q.popleft()
            if node:
                out.append(str(node.val))
                q.append(node.left)
                q.append(node.right)
            else:
                out.append("N")
        return ",".join(out)

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        :type data: str
        :rtype: TreeNode
        """
        arr = data.split(",")
        if len(arr) == 1: return None
        root = TreeNode(int(arr[0]))
        q = collections.deque([root])
        i = 1
        while q:
            node = q.popleft()
            node.left  = TreeNode(int(arr[i]))   if arr[i]   != "N" else None
            node.right = TreeNode(int(arr[i+1])) if arr[i+1] != "N" else None
            if node.left:  q.append(node.left)
            if node.right: q.append(node.right)
            i += 2
        return root

# DFS Preorder
class Codec:
    def serialize(self, root):
        """Encodes a tree to a single string.
        :type root: TreeNode
        :rtype: str
        """
        out = []
        def dfs(root):
            if not root: 
                out.append("N")
                return
            out.append(str(root.val))
            dfs(root.left)
            dfs(root.right)
        dfs(root)
        return ",".join(out)

    def deserialize(self, data):
        """Decodes your encoded data to tree.
        :type data: str
        :rtype: TreeNode
        """
        arr = data.split(",")
        self.i = 0
        def dfs():
            if arr[self.i] == "N":
                self.i += 1
                return None
            root = TreeNode(arr[self.i])
            self.i += 1
            root.left = dfs()
            root.right = dfs()
            return root
        return dfs()