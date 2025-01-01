// Mock wallet implementation for testing
export class MockWallet {
  private static balance: number = 1000; // Initial balance of 1000 EDUCA tokens
  private static address: string = '0x' + Math.random().toString(16).slice(2, 42);
  private static connected: boolean = false;

  static async connect(): Promise<string> {
    this.connected = true;
    return this.address;
  }

  static getBalance(): number {
    return this.balance;
  }

  static async transfer(amount: number): Promise<boolean> {
    if (amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  static async receive(amount: number): Promise<boolean> {
    this.balance += amount;
    return true;
  }

  static isConnected(): boolean {
    return this.connected;
  }
}