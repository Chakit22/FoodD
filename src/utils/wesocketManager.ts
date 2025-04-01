class WebSocketManager {
  private static instance: WebSocket | null = null;
  private static listeners: ((data: string) => void)[] = [];
  private static isConnecting: boolean = false;

  static getInstance(): WebSocket {
    if (!this.instance || this.instance.readyState === WebSocket.CLOSED) {
      if (this.isConnecting) return this.instance!; // Prevent multiple reconnections
      this.isConnecting = true;

      console.log("Creating new WebSocket connection...");
      this.instance = new WebSocket("ws://localhost:8080");

      this.instance.onopen = () => {
        console.log("WebSocket Connected ✅");
        this.isConnecting = false;
      };

      this.instance.onclose = () => {
        console.log("WebSocket Disconnected ❌. Reconnecting in 3 seconds...");
        this.instance = null;
        setTimeout(() => this.getInstance(), 3000); // Retry after 3 seconds
      };

      this.instance.onmessage = (event) => {
        console.log("New Message Received:", event.data);
        this.listeners.forEach((callback) => callback(event.data));
      };
    }
    return this.instance!;
  }

  static addListener(callback: (data: string) => void) {
    this.listeners.push(callback);
  }
}

export default WebSocketManager;
