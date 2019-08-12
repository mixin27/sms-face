const codeMessage = {
    200 :  'The server successfully returned the requested data. ' ,
    201 :  ' New or modified data is successful. ' ,
    202 :  ' A request has entered the background queue (asynchronous task). ' ,
    204 :  ' Delete data successfully. ' ,
    400 :  ' The request was sent with an error, and the server did not perform operations to create or modify data. ' ,
    401 :  'The user does not have permission (token, username, password is incorrect). ' ,
    403 :  ' User is authorized, but access is forbidden. ' ,
    404 :  ' The request was made for a record that does not exist and the server did not operate. ' ,
    406 :  ' The format of the request is not available. ' ,
    410 :  'The requested resource was permanently deleted and will not be obtained again. ' ,
    422 :  ' A validation error occurred while creating an object. ' ,
    500 :  'The server has an error, please check the server. ' ,
    502 :  ' Gateway error. ' ,
    503 :  'The service is unavailable, the server is temporarily overloaded or maintained. ' ,
    504 :  'The gateway timed out. ' ,
};


const cachedSave = (response, hashcode) => {
    /**
     * Clone a response data and store it in sessionStorage
     * Does not support data other than json, Cache only json
     */
    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.match(/application\/json/i)) {
      // All data is saved as text
      response
        .clone()
        .text()
        .then(content => {
          sessionStorage.setItem(hashcode, content);
          sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
        });
    }
    return response;
};