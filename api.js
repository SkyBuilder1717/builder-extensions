let extensions = [];

let xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", '/extensions-list.json', false);
xmlHttp.send(null);
extensions = JSON.parse(xmlHttp.responseText);

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

for (let i = 0; i < extensions.length; i++) {
    const extension = extensions[i];

    const div = document.createElement('div');
    div.classList.add('extension');
    div.id = extension.id;
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

        xmlHttp.open("GET", `https://skybuilder.synology.me/builder-extensions/downloads/?extension=${extension.id}`, false);
        xmlHttp.send(null);
        const downloads = document.createElement('p');
        downloads.textContent = xmlHttp.responseText + " Downloads";
        menu.appendChild(downloads);

        const by = document.createElement('p');
        by.textContent = "By ";
        const author = document.createElement('a');
        author.href = extension.link;
        author.textContent = extension.author;
        by.appendChild(author);
        menu.appendChild(by);

        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const closeDiv = document.createElement('div');
        closeDiv.classList.add('button');
        closeDiv.id = "close";
        const close = document.createElement('a');
        close.textContent = "Close menu";
        close.onclick = () => {
            document.body.removeChild(menu);
        }
        closeDiv.appendChild(close);
        buttons.appendChild(closeDiv);

        const copyBtn = document.createElement('div');
        copyBtn.classList.add('button');
        const copy = document.createElement('a');
        copy.textContent = "Copy URL";
        copy.onclick = () => {
            navigator.clipboard.writeText(`https://skybuilder-extensions.vercel.app/extensions/${extension.id}.js`);
            copy.textContent = "Copied!"
            copyBtn.appendChild(copy);
            buttons.appendChild(copyBtn);
            menu.appendChild(buttons);
            document.body.appendChild(menu);
            fetch(`https://skybuilder.synology.me/builder-extensions/download/?extension=${extension.id}`);
        }
        copyBtn.appendChild(copy);
        buttons.appendChild(copyBtn);

        menu.appendChild(buttons);

        document.body.appendChild(menu);
    };
    div.appendChild(openMenuButton);
    container.appendChild(div);
}

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
