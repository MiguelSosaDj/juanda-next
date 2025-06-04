type ActionType = 'create' | 'update' | 'delete' | 'view';

interface ActionLog {
  userId: string;
  action: ActionType;
  entityType: string;
  entityId?: string;
  details?: Record<string, any>;
  timestamp: Date;
}

class ActionLogger {
  private static instance: ActionLogger;
  private queue: ActionLog[] = [];

  private constructor() {}

  static getInstance(): ActionLogger {
    if (!ActionLogger.instance) {
      ActionLogger.instance = new ActionLogger();
    }
    return ActionLogger.instance;
  }

  async logAction(
    userId: string,
    action: ActionType,
    entityType: string,
    entityId?: string,
    details?: Record<string, any>
  ) {
    const logEntry: ActionLog = {
      userId,
      action,
      entityType,
      entityId,
      details,
      timestamp: new Date(),
    };

    this.queue.push(logEntry);
    await this.processQueue();
  }

  private async processQueue() {
    if (this.queue.length === 0) return;

    try {
      const batch = this.queue.splice(0, 10);
      await fetch('/api/audit/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ logs: batch }),
      });
    } catch (error) {
      console.error('Error processing action logs:', error);
      // Requeue failed items
      this.queue.unshift(...this.queue.splice(0, 10));
    }
  }
}

export const actionLogger = ActionLogger.getInstance();