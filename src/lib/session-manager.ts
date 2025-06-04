import {  auth } from '@clerk/nextjs/server';

interface SessionInfo {
  userId: string | null;
  isAuthenticated: boolean;
  lastActivity: Date;
}

class SessionManager {
  private static instance: SessionManager;
  private sessionInfo: SessionInfo | null = null;
  private activityInterval: NodeJS.Timeout | null = null;

  private constructor() {
    if (typeof window !== 'undefined') {
      this.startActivityTracking();
    }
  }

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  async initializeSession() {
    const { userId } = await auth();
    
    this.sessionInfo = {
      userId: userId || null,
      isAuthenticated: !!userId,
      lastActivity: new Date(),
    };

    return this.sessionInfo;
  }

  private startActivityTracking() {
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
    }

    this.activityInterval = setInterval(() => {
      if (this.sessionInfo) {
        const inactiveTime = Date.now() - this.sessionInfo.lastActivity.getTime();
        if (inactiveTime > 30 * 60 * 1000) { // 30 minutes
          this.handleInactivity();
        }
      }
    }, 60000); // Check every minute
  }

  updateActivity() {
    if (this.sessionInfo) {
      this.sessionInfo.lastActivity = new Date();
    }
  }

  private async handleInactivity() {
    // Redirect to login or show inactivity warning
    window.location.href = '/login?reason=inactivity';
  }

  getSessionInfo(): SessionInfo | null {
    return this.sessionInfo;
  }

  clearSession() {
    this.sessionInfo = null;
    if (this.activityInterval) {
      clearInterval(this.activityInterval);
      this.activityInterval = null;
    }
  }
}

export const sessionManager = SessionManager.getInstance();