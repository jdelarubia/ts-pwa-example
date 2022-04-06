type WebWorkerEvent = Partial<
  Event & { request?: Request; waitUntil?: Function; respondWith?: Function }
>;

type WebWorkerSelf = Partial<Window & { skipWaiting: Function }>;

export { WebWorkerEvent, WebWorkerSelf };
