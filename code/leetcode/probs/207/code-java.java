// DFS with state(colors)
class Solution {
    public boolean canFinish(int n, int[][] preq) {
    
        Map < Integer, ArrayList < Integer > > graph = new HashMap<>();
        for (int i = 0; i < n; i ++){
            graph.put(i, new ArrayList<Integer>());
        }
        for (int[] edge: preq){
            graph.get(edge[0]).add(edge[1]);
        }
        
        int[] state = new int[n];
        for (int i = 0; i < n; i++){
            if (state[i] == 0){
                if (dfs(i, state, graph)){
                    return false;    
                } 
            }
        }
        return true;
        
    }
    
    private boolean dfs(int node, int[] state, Map<Integer, ArrayList<Integer>> graph){
        
        state[node] = 1;
        for (Integer nei: graph.get(node)){
            if (state[nei] == 0 && dfs(nei, state, graph)) return true;
            if (state[nei] == 1) return true;
        }        
        state[node] = 2;
        return false;        
    }
}