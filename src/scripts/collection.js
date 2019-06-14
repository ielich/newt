const response = [];
window.onload = function() {
    const input = document.getElementById('fileInput');

    input.addEventListener('change', (e) => {
        const file = input.files[0];
        const reader = new FileReader();

        reader.readAsText(file);

        reader.onload = function() {
            const harContent = reader.result;
            const contentObj = JSON.parse(harContent);
            const entries = contentObj.log.entries;

            entries.forEach((entry, index) => {
                response.push({
                    time: entry.time,
                    type: entry._resourceType,
                    size: entry.response.content.size
                });
            });
            const JSONResponse = JSON.stringify(response);
            localStorage.setItem('responseData', JSONResponse);
        }
    });
}