const extensions = [
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"}
];

const container = document.getElementById('extensions');

extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    let text = `<h3>${extension.name}</h3>`;
    const downloadButton = document.createElement('img');
    downloadButton.src = `/extensions/${extension.id}.png`;
    downloadButton.alt = `Download ${extension.name}`;
    downloadButton.style.cursor = "pointer";
    const downloadUrl = `/extensions/${extension.id}.js`;
    downloadButton.onclick = () => downloadExtension(downloadUrl);
    div.appendChild(downloadButton);
    if (extension.link) {
        text = text + `<p>Author: <a href="${extension.link}">${extension.author}</a></p>`;
    } else {
        text = text + `<p>Author: ${extension.author}</p>`;
    }
    div.innerHTML = text;
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

const toggleButton = document.getElementById('toggle-theme');
toggleButton.onclick = () => {
    document.body.classList.toggle('dark-mode');
    toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? '<img src="/img/sun.png" />' : '<img src="/img/moon.png" />';
};
