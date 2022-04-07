type WebWorkerEvent = Partial<
  Event & {
    readonly clientId: string;
    readonly preloadResponse: Promise<Response>;
    readonly replacesClientId: string;
    readonly resultingClientId: string;
    readonly request?: Request;
    waitUntil?: Function;
    respondWith?: Function;
  }
>;

type WebWorkerSelf = Partial<Window & { skipWaiting: Function }>;

export { WebWorkerEvent, WebWorkerSelf };
