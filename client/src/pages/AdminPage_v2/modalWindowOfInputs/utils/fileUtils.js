export function fileToBase64(file, callback) {
    if (!file) {
        console.error("No file provided for conversion.");
        return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
        if (reader.readyState === FileReader.DONE) {
            if (typeof callback === 'function') {
                callback(reader.result);
            }
        }
    };

    reader.onerror = (error) => {
        console.error("Error reading file:", error);
    };

    reader.readAsDataURL(file);
}
