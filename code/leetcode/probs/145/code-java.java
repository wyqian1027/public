// 1. Like PreOrder, Reverse the solution.
class Solution {
    public List < Integer > postorderTraversal(TreeNode root) {
        
        LinkedList < Integer > arr = new LinkedList<>();
        Stack < TreeNode > stack = new Stack<>();
        
        if (root == null) {
            return arr;
        }
        stack.add(root);
        
        while (!stack.isEmpty()){
            
            TreeNode cur = stack.pop();
            arr.addFirst(cur.val); // or reverse at last
            
            if (cur.left != null) stack.push(cur.left);
            if (cur.right != null) stack.push(cur.right);
        }
        
        return arr;
    }
}

// 2. General approach with Stack and Pointer
class Solution {
    public List < Integer > postorderTraversal(TreeNode root) {
        
        LinkedList < Integer > arr = new LinkedList<>();
        Stack < TreeNode > stack = new Stack<>();
        TreeNode cur = root;
        
        while (cur != null || !stack.isEmpty()){
            
            if (cur != null){
                arr.addFirst(cur.val);
                stack.push(cur);
                cur = cur.right;
            } else {
                cur = stack.pop();
                cur = cur.left;
            }
        }        
        
        return arr;
    }
}