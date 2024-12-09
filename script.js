const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const statusCodes = [
    // Informational responses (100-199)
    { code: 100, type: "1XX informational", message: "Continue", description: "The server has received the request headers, and the client should proceed to send the request body." },
    { code: 101, type: "1XX informational", message: "Switching Protocols", description: "The requester has asked the server to switch protocols, and the server is agreeing to do so." },
    { code: 102, type: "1XX informational", message: "Processing", description: "The server has received and is processing the request, but no response is available yet." },
    { code: 103, type: "1XX informational", message: "Early Hints", description: "The server is sending preliminary information, such as suggested caching headers." },
    { code: 200, type: "2XX success", message: "OK", description: "The request has succeeded." },
    { code: 201, type: "2XX success", message: "Created", description: "The request has been fulfilled and resulted in a new resource being created." },
    { code: 202, type: "2XX success", message: "Accepted", description: "The request has been accepted for processing, but the processing has not been completed." },
    { code: 203, type: "2XX success", message: "Non-Authoritative Information", description: "The returned meta-information is not from the origin server, but from a local or third-party copy." },
    { code: 204, type: "2XX success", message: "No Content", description: "The server has successfully processed the request, but there is no content to return." },
    { code: 205, type: "2XX success", message: "Reset Content", description: "The server has successfully processed the request, and the client should reset the document view." },
    { code: 206, type: "2XX success", message: "Partial Content", description: "The server is delivering only part of the resource due to a range header sent by the client." },
    { code: 207, type: "2XX success", message: "Multi-Status", description: "The message body contains multiple status codes for different parts of the request." },
    { code: 208, type: "2XX success", message: "Already Reported", description: "The members of a DAV binding have already been enumerated in a previous reply to this request." },
    { code: 226, type: "2XX success", message: "IM Used", description: "The server has fulfilled a request for the resource, and the response is a result of an integral transformation applied to the resource." },
    { code: 300, type: "3XX redirection", message: "Multiple Choices", description: "There are multiple options for the resource that the client may follow." },
    { code: 301, type: "3XX redirection", message: "Moved Permanently", description: "The resource has been permanently moved to a new location." },
    { code: 302, type: "3XX redirection", message: "Found", description: "The resource resides temporarily under a different URL." },
    { code: 303, type: "3XX redirection", message: "See Other", description: "The response to the request can be found under another URL using the GET method." },
    { code: 304, type: "3XX redirection", message: "Not Modified", description: "The resource has not been modified since the last request, and the client can use the cached version." },
    { code: 305, type: "3XX redirection", message: "Use Proxy", description: "The requested resource must be accessed through the proxy given by the Location field." },
    { code: 307, type: "3XX redirection", message: "Temporary Redirect", description: "The resource resides temporarily under a different URL, and the client should use the same method for the next request." },
    { code: 308, type: "3XX redirection", message: "Permanent Redirect", description: "The resource has permanently moved to a new location, and the client should use the new URL in the future." },
    { code: 400, type: "4XX client-error", message: "Bad Request", description: "The server could not understand the request due to invalid syntax." },
    { code: 401, type: "4XX client-error", message: "Unauthorized", description: "The client must authenticate itself to get the requested response." },
    { code: 402, type: "4XX client-error", message: "Payment Required", description: "This code is reserved for future use. It indicates that payment is required." },
    { code: 403, type: "4XX client-error", message: "Forbidden", description: "The server understands the request, but it refuses to authorize it." },
    { code: 404, type: "4XX client-error", message: "Not Found", description: "The server could not find the requested resource." },
    { code: 405, type: "4XX client-error", message: "Method Not Allowed", description: "The request method is known by the server but is not supported by the resource." },
    { code: 406, type: "4XX client-error", message: "Not Acceptable", description: "The server can generate a response that the client cannot process." },
    { code: 407, type: "4XX client-error", message: "Proxy Authentication Required", description: "The client must authenticate itself with the proxy." },
    { code: 408, type: "4XX client-error", message: "Request Timeout", description: "The server timed out waiting for the request." },
    { code: 409, type: "4XX client-error", message: "Conflict", description: "The request could not be processed due to a conflict with the current state of the resource." },
    { code: 410, type: "4XX client-error", message: "Gone", description: "The resource requested is no longer available and will not be available again." },
    { code: 411, type: "4XX client-error", message: "Length Required", description: "The server requires the request to specify the length of the content." },
    { code: 412, type: "4XX client-error", message: "Precondition Failed", description: "One or more conditions in the request header fields were not met." },
    { code: 413, type: "4XX client-error", message: "Payload Too Large", description: "The request is larger than the server is willing or able to process." },
    { code: 414, type: "4XX client-error", message: "URI Too Long", description: "The URI provided was too long for the server to process." },
    { code: 415, type: "4XX client-error", message: "Unsupported Media Type", description: "The media type of the request data is not supported by the server." },
    { code: 416, type: "4XX client-error", message: "Range Not Satisfiable", description: "The server cannot provide the requested range of data." },
    { code: 417, type: "4XX client-error", message: "Expectation Failed", description: "The server cannot meet the requirements of the Expect request-header field." },
    { code: 418, type: "4XX client-error", message: "I'm a Teapot", description: "The server is a teapot, and it cannot brew coffee (this is an April Fools' joke from 1998)." },
    { code: 421, type: "4XX client-error", message: "Misdirected Request", description: "The request was directed at a server that is not able to produce a response." },
    { code: 422, type: "4XX client-error", message: "Unprocessable Entity", description: "The server understands the content type of the request, but the request is semantically erroneous." },
    { code: 423, type: "4XX client-error", message: "Locked", description: "The resource that is being accessed is locked." },
    { code: 424, type: "4XX client-error", message: "Failed Dependency", description: "The request failed due to a dependency failure." },
    { code: 425, type: "4XX client-error", message: "Too Early", description: "The server is unwilling to risk processing a request that might be replayed." },
    { code: 426, type: "4XX client-error", message: "Upgrade Required", description: "The client should switch to a different protocol." },
    { code: 428, type: "4XX client-error", message: "Precondition Required", description: "The server requires the request to be conditional." },
    { code: 429, type: "4XX client-error", message: "Too Many Requests", description: "The user has sent too many requests in a given amount of time." },
    { code: 431, type: "4XX client-error", message: "Request Header Fields Too Large", description: "The server is unwilling to process the request because its header fields are too large." },
    { code: 451, type: "4XX client-error", message: "Unavailable For Legal Reasons", description: "The resource is unavailable due to legal reasons." },

    // Server error responses (500-599)
    { code: 500, type: "5XX server-error", message: "Internal Server Error", description: "The server has encountered a situation it doesn't know how to handle." },
    { code: 501, type: "5XX server-error", message: "Not Implemented", description: "The server does not recognize the request method, or it lacks the ability to fulfill the request." },
    { code: 502, type: "5XX server-error", message: "Bad Gateway", description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server." },
    { code: 503, type: "5XX server-error", message: "Service Unavailable", description: "The server is not ready to handle the request, typically due to being overloaded or down for maintenance." },
    { code: 504, type: "5XX server-error", message: "Gateway Timeout", description: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server." },
    { code: 505, type: "5XX server-error", message: "HTTP Version Not Supported", description: "The server does not support the HTTP protocol version that was used in the request." },
    { code: 506, type: "5XX server-error", message: "Variant Also Negotiates", description: "The server has an internal configuration error: transparent content negotiation for the request results in a circular reference." },
    { code: 507, type: "5XX server-error", message: "Insufficient Storage", description: "The server is unable to store the representation needed to complete the request." },
    { code: 508, type: "5XX server-error", message: "Loop Detected", description: "The server detected an infinite loop while processing the request." },
    { code: 510, type: "5XX server-error", message: "Not Extended", description: "Further extensions to the request are required for the server to fulfill it." },
    { code: 511, type: "5XX server-error", message: "Network Authentication Required", description: "The client needs to authenticate to gain network access." }
];
const container = document.querySelector('.status-container');
const searchInput = document.getElementById('search');

// Function to display the cards
function displayCards(codes) {
    container.innerHTML = '';

    if (codes.length === 0) {
        const error404 = document.createElement('div');
        error404.className = 'error-404';
        error404.innerHTML = `
        <h1>404</h1>
        <p>Not Found</p>
      `;
        container.appendChild(error404);
    } else {
        codes.forEach(({ code, type, message, description }) => {
            const card = document.createElement('div');
            card.className = `status-card ${type}`;
            card.innerHTML = `
          <div class="status-content">
            <p class="status-type">${type.replace("-", " ")}</p>
            <h2 class="status-code">${code}</h2>
            <span class="status-description">${description}</span>
            <span class="status-message">${message}</span>
          </div>
        `;

            card.addEventListener('click', () => {
                const jsonResponse = {
                    code: code,
                    message: message,
                    description: description
                };

                navigator.clipboard.writeText(JSON.stringify(jsonResponse, null, 2))
                    .then(() => {
                        Toast.fire({
                            icon: "success",
                            title: "JSON format copied to clipboard!"
                        });
                    })
                    .catch(() => {
                        Toast.fire({
                            icon: "error",
                            title: "Failed to copy to clipboard:"
                        });
                    });
            });

            container.appendChild(card);
        });
    }
}

// Initialize the cards
displayCards(statusCodes);

// Search filter
searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const filteredCodes = statusCodes.filter(({ code, type, description, message }) =>
        code.toString().includes(query) ||
        type.toLowerCase().includes(query) ||
        description.toLowerCase().includes(query) ||
        message.toLowerCase().includes(query)
    );
    displayCards(filteredCodes);
});

document.addEventListener('contextmenu', (event) => event.preventDefault());

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
    } else {
        body.classList.replace('light-theme', 'dark-theme');
    }
});
