class MyStack {

    Queue<Integer> queue;
    
    public MyStack() {
        queue = new LinkedList<Integer>();
    }
    
    public void push(int x) {
        queue.offer(x);
        for (int i = 0; i < queue.size()-1; i++) queue.offer(queue.poll());
    }
    
    public int pop() {
        return queue.poll();        
    }
    
    public int top() {
        return queue.peek();
    }
    
    public boolean empty() {
        return queue.isEmpty();    
    }
}