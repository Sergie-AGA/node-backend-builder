interface IObserver {
  (data: unknown): void;
}

class ObserverPattern {
  observers: Array<IObserver>;

  constructor() {
    this.observers = [];
  }

  subscribe(observerFunction: IObserver) {
    this.observers.push(observerFunction);
  }

  unsubscribe(observerFunction: IObserver) {
    this.observers = this.observers.filter((obs) => obs !== observerFunction);
  }

  notifyAll(data: unknown) {
    for (const observerFunction of this.observers) observerFunction(data);
  }
}
