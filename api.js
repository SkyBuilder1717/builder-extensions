const extensions = [
    { name: "Extension 1", description: "This extension does amazing things.", url: "/extensions/extension3.json" }
];
const container = document.getElementById('extensions');
extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    div.innerHTML = `<h3>${extension.name}</h3><p>${extension.description}</p>`;
    const downloadButton = document.createElement('button');
    downloadButton.innerText = "Download";
    downloadButton.classList.add('download-button');
    downloadButton.onclick = () => downloadExtension(extension.url);
    div.appendChild(downloadButton);
    container.appendChild(div);
});
function downloadExtension(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
