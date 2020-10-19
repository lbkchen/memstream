import { useState, useEffect } from 'react';
import { ipcRenderer } from 'electron';

export const DB_REQUEST_CHANNEL = 'db-request';
export const DB_RESPONSE_CHANNEL = 'db-response';

export function useDB(query: string) {
  const [response, setResponse] = useState<any[]>([]);

  useEffect(() => {
    ipcRenderer.send(DB_REQUEST_CHANNEL, { query });

    const responseHandler = (
      event: Electron.IpcRendererEvent,
      ...args: any[]
    ) => {
      console.log('Renderer received db response:', event, args);
      setResponse(args);
    };

    ipcRenderer.on(DB_RESPONSE_CHANNEL, responseHandler);
    return () => {
      ipcRenderer.removeListener(DB_RESPONSE_CHANNEL, responseHandler);
    };
  }, [query]);

  return response;
}

export function postDB(doc: Record<string, string>, id?: string) {
  // TODO: Generate request UUID here
  ipcRenderer.send(DB_REQUEST_CHANNEL, { _id: id, ...doc });

  return new Promise<typeof doc>((resolve, reject) => {
    // TODO: This should probably listen on a channel like db-response-<uuid>
    // which can fan out from the main thread handler
    ipcRenderer.once(DB_RESPONSE_CHANNEL, (event, args) => {
      resolve(args);
    });
  });
}
