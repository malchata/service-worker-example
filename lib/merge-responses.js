// Totally cribbed this from Jake Archibald. Thanks, Jake:
// https://gist.github.com/jakearchibald/d0b7e65496a8ec362f10739c3e28da6e
export const mergeResponses = async responsePromises => {
  const readers = responsePromises.map(responsePromise => {
    return Promise.resolve(responsePromise).then(response => {
      return response.body.getReader();
    });
  });

  let doneResolve;
  let doneReject;

  const done = new Promise((resolve, reject) => {
    doneResolve = resolve;
    doneReject = reject;
  });

  const readable = new ReadableStream({
    async pull (controller) {
      const reader = await readers[0];

      try {
        const { done, value } = await reader.read();

        if (done) {
          readers.shift();

          if (!readers[0]) {
            controller.close();
            doneResolve();

            return;
          }

          return this.pull(controller);
        }

        controller.enqueue(value);
      } catch (err) {
        doneReject(err);
        throw err;
      }
    },
    cancel () {
      doneResolve();
    }
  });

  const headers = new Headers();
  headers.append("Content-Type", "text/html");

  return {
    done,
    response: new Response(readable, {
      headers
    })
  };
};
