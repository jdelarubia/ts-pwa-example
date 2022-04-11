type ExtendableEvent = Partial<Event> & {
  waitUntil?: Function;
};

type BeforeInstallPromptEvent = (Partial<Event> & { prompt?: Function }) | null;

type WebWorkerEvent = Partial<Event> &
  Partial<{
    readonly clientId: string;
    readonly preloadResponse: Promise<Response>;
    readonly replacesClientId: string;
    readonly resultingClientId: string;
    readonly request?: Request;
    respondWith?: Function;
  }>;

type WebWorker = Partial<Window> & { skipWaiting?: Function };

export { WebWorkerEvent, WebWorker, ExtendableEvent, BeforeInstallPromptEvent };
