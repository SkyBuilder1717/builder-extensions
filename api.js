const extensions = [
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"}
];

const container = document.getElementById('extensions');

extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    let text = `<h3>${extension.name}</h3>`;
    div.innerHTML = text;
    const downloadButton = document.createElement('img');
    downloadButton.src = `/extensions/${extension.id}.png`;
    downloadButton.style.cursor = "pointer";
    const downloadUrl = `/extensions/${extension.id}.js`;
    downloadButton.onclick = () => downloadExtension(downloadUrl);
    div.appendChild(downloadButton);
    if (extension.link) {
        text = `Author: <a href="${extension.link}">${extension.author}</a>`;
    } else {
        text = `Author: ${extension.author}`;
    }
    const author = document.createElement('p');
    author.innerHTML = text;
    div.appendChild(author);
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

let darkMode = localStorage.getItem('darkMode') === 'true';
const toggleButton = document.getElementById('toggle-theme');
const modeLight = '<img src="/img/sun.png" />';
const modeDark = '<img src="/img/moon.png" />';

if (darkMode) {
    document.body.classList.add('dark-mode');
    toggleButton.innerHTML = modeLight;
}

toggleButton.onclick = () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? modeLight : modeDark;
    localStorage.setItem('darkMode', darkMode);
};
