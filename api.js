const extensions = [
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"}
];

const container = document.getElementById('extensions');

extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    const text = `<h3>${extension.name}</h3>`;
    if (extension.link) {
        text = text + `<p>Author: <a href="${extension.link}">${extension.author}</a></p>`;
    } else {
        text = text + `<p>Author: ${extension.author}</p>`;
    }
    div.innerHTML = text;
    const downloadButton = document.createElement('img');
    downloadButton.src = `/extensions/${extension.id}.png`;
    downloadButton.alt = `Download ${extension.name}`;
    downloadButton.style.cursor = "pointer";
    const downloadUrl = `/extensions/${extension.id}.js`;
    downloadButton.onclick = () => downloadExtension(downloadUrl);
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
