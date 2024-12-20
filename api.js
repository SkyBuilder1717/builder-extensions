const extensions = [
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Geometry_Dash_Tools", name: "Geometry Dash Tools", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
];

const container = document.getElementById('extensions');

extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    const downloadButton = document.createElement('img');
    downloadButton.src = `/extensions/${extension.id}.png`;
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

let darkMode = localStorage.getItem('darkMode') === 'true';
const toggleButton = document.getElementById('toggle-theme');
const modeLight = '<img src="/img/sun.png" />';
const modeDark = '<img src="/img/moon.png" />';

if (darkMode) {
    document.body.classList.add('dark-mode');
    toggleButton.innerHTML = modeDark;
}

toggleButton.onclick = () => {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    toggleButton.innerHTML = document.body.classList.contains('dark-mode') ? modeDark : modeLight;
    localStorage.setItem('darkMode', darkMode);
};
