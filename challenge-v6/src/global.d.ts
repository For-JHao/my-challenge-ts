declare global {
    const Buffer: typeof import('buffer').Buffer;
    interface Window {
        Buffer: typeof import('buffer').Buffer;
      }
}

export { };