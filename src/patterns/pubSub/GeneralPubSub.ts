interface IDomainEvent {
  (event: any): void;
}

export class PubSub {
  private static subscribers: Record<string, Array<IDomainEvent>> = {};

  static subscribe(event: string, subscriber: IDomainEvent) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(subscriber);
  }

  static unsubscribe(event: string, subscriber: IDomainEvent) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter((sub) => {
      return sub !== subscriber;
    });
  }

  static publish(event: string, data: unknown) {
    if (!this.subscribers[event]) {
      return;
    }
    for (const subscriber of this.subscribers[event]) {
      subscriber(data);
    }
  }
}
