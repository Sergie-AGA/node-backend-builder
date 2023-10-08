interface ISubscriber {
  (data: unknown): void;
}

interface IPubSub {
  subscribe(event: string, subscriber: ISubscriber): void;
  unsubscribe(event: string, subscriber: ISubscriber): void;
  publish(event: string, data: unknown): void;
}

class PubSub implements IPubSub {
  subscribers: Record<string, Array<ISubscriber>>;

  constructor() {
    this.subscribers = {};
  }

  subscribe(event: string, subscriber: ISubscriber) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(subscriber);
  }

  unsubscribe(event: string, subscriber: ISubscriber) {
    if (!this.subscribers[event]) {
      return;
    }
    this.subscribers[event] = this.subscribers[event].filter(
      (sub) => sub !== subscriber
    );
  }

  publish(event: string, data: unknown) {
    if (!this.subscribers[event]) {
      return;
    }
    for (const subscriber of this.subscribers[event]) {
      subscriber(data);
    }
  }
}
