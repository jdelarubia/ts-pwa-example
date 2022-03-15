type WebWorkerEvent = Partial<
  Event & { request?: RequestInfo; waitUntil?: Function }
>;

export { WebWorkerEvent };
