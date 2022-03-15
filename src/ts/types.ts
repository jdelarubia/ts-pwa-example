type WebWorkerEvent = Partial<
  Event & { request?: Request; waitUntil?: Function }
>;

export { WebWorkerEvent };
