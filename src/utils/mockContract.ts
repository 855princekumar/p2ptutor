import { MockWallet } from './mockWallet';

interface Session {
  id: string;
  tutorAddress: string;
  traineeAddress: string;
  amount: number;
  startTime: number;
  tutorConfirmed: boolean;
  traineeConfirmed: boolean;
}

export class MockContract {
  private static sessions: Map<string, Session> = new Map();
  private static escrow: Map<string, number> = new Map();

  static async createSession(
    tutorAddress: string,
    traineeAddress: string,
    amount: number,
    nftId: string
  ): Promise<string> {
    const sessionId = `session_${Date.now()}`;
    
    // Transfer tokens to escrow
    const success = await MockWallet.transfer(amount);
    if (!success) {
      throw new Error('Insufficient funds');
    }

    this.escrow.set(sessionId, amount);
    
    const session: Session = {
      id: sessionId,
      tutorAddress,
      traineeAddress,
      amount,
      startTime: Date.now(),
      tutorConfirmed: false,
      traineeConfirmed: false
    };

    this.sessions.set(sessionId, session);
    return sessionId;
  }

  static async confirmSession(sessionId: string, address: string): Promise<boolean> {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    if (address === session.tutorAddress) {
      session.tutorConfirmed = true;
    } else if (address === session.traineeAddress) {
      session.traineeConfirmed = true;
    }

    if (session.tutorConfirmed && session.traineeConfirmed) {
      // Release escrow to tutor
      const amount = this.escrow.get(sessionId) || 0;
      await MockWallet.receive(amount);
      this.escrow.delete(sessionId);
      return true;
    }

    return false;
  }

  static getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }
}