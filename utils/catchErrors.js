function catchErrors(error, displayError) {
    let errorMsg;
    if (error.response) {
        // request made, and server responded with non 2XX status code
        errorMsg = error.response.data;
        console.log("Error response", errorMsg)
        
        // Cloudinary specific error
        if (error.response.data.error) {
            errorMsg = error.response.data.error.message;
        }
    }
    else if (error.request) {
        // request made, but no response received
        errorMsg = error.request;
        console.log("Error request", errorMsg)
    }
    else {
        // Something else has happened
        errorMsg = error.message;
        console.log("Error message", errorMsg);
    }
    displayError(errorMsg)
}

export default catchErrors;