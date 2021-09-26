import { PubSub } from './pubsub';

export function fetchData() {
  return fetch('http://127.0.0.1:8080/data.json')
    .then(response => {
      return response.json();
    });
}

export async function publishData() {
  const data = await fetchData();

  PubSub.pub('data', data);
}