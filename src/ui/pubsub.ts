type Subscriber<T> = {
  id: string
  callback: (data: T) => void
}

class PubSub<T> {
  private subscribers: Subscriber<T>[] = []

  subscribe(id: string, callback: (data: T) => void) {
    const subscriber = { id, callback }
    this.subscribers.push(subscriber)
    return {
      id,
      unsubscribe: () => this.unsubscribe(id)
    }
  }

  unsubscribe(id: string) {
    this.subscribers = this.subscribers.filter(sub => sub.id !== id)
  }

  publish(id: string, data: T) {
    this.subscribers.filter(subscriber => subscriber.id === id).forEach(subscriber => subscriber.callback(data))
  }
}

export const postUpdates = new PubSub<any>()
