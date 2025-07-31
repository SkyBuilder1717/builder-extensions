const extensions = [
    {id: "GeometryDashTools", name: "Geometry Dash Tools", description: "Adds some utilities to manage Geometry Dash Browser", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"},
    {id: "Sparrow", name: "Sparrow", description: "Adds support for Sparrow V2 spritesheet Adobe Animate export format", author: "SkyBuilder1717", link: "https://scratch.mit.edu/users/SkyBuilder1717/"}
];

const container = document.getElementsByClassName('extensions')[0];

function checkFile(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url + '?_=' + Date.now();
  });
}

async function findImage(baseUrl, baseName) {
  const pngExists = await checkFile(`${baseUrl}/${baseName}.png`);
  if (pngExists) return `${baseName}.png`;
  const svgExists = await checkFile(`${baseUrl}/${baseName}.svg`);
  if (svgExists) return `${baseName}.svg`;
  return null;
}

extensions.forEach(extension => {
    const div = document.createElement('div');
    div.classList.add('extension');
    const openMenuButton = document.createElement('img');

    findImage('/static/extensions', extension.id).then(result => {
        if (result) openMenuButton.src = '/static/extensions/' + result;
    });

    openMenuButton.onclick = () => {
        const oldMenu = document.getElementsByClassName('menu')[0];
        if (oldMenu) document.body.removeChild(oldMenu);

        const menu = document.createElement('div');
        menu.classList.add('menu');

        const title = document.createElement('h3');
        title.textContent = extension.name;
        menu.appendChild(title);

        const description = document.createElement('p');
        description.textContent = extension.description;
        menu.appendChild(description);

        const by = document.createElement('p');
        by.textContent = "By ";
        const author = document.createElement('a');
        author.href = extension.link;
        author.textContent = extension.author;
        by.appendChild(author);
        menu.appendChild(by);

        const close = document.createElement('a');
        close.id = "button";
        close.name = "close";
        close.textContent = "Close menu";
        close.onclick = () => {
            document.body.removeChild(menu);
        }
        menu.appendChild(close);

        const copy = document.createElement('a');
        copy.id = "button";
        copy.name = "copy";
        copy.textContent = "Copy URL";
        copy.onclick = () => {
            navigator.clipboard.writeText(`https://skybuilder-extensions.vercel.app/extensions/${extension.id}.js`);
            copy.textContent = "Copied!"
            menu.appendChild(copy);
            document.body.appendChild(menu);
        }
        menu.appendChild(copy);

        document.body.appendChild(menu);
    };
    div.appendChild(openMenuButton);
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
const modeLight = '<img src="/static/sun.png" />';
const modeDark = '<img src="/static/moon.png" />';

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
