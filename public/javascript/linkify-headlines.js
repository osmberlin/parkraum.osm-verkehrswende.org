// http://blog.parkermoore.de/2014/08/01/header-anchor-links-in-vanilla-javascript-for-github-pages-and-jekyll/

const anchorForId = function (id) {
  const anchor = document.createElement("a");
  anchor.href = `#${id}`;
  anchor.className = "print:hidden relative left-1.5 opacity-50 hover:opacity-100 transition-all inline-flex justify-center";
  // https://icons.getbootstrap.com/icons/link/
  const svgClassNames = "inline-flex w-5 h-5";
  anchor.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="${svgClassNames}" fill="currentColor" viewBox="0 0 15 15">
      <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
      <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
    </svg >`;
  return anchor;
};

const linkifyAnchors = function (level, containingElement) {
  const headers = containingElement.getElementsByTagName("h" + level);
  for (let h = 0; h < headers.length; h++) {
    const header = headers[h];

    if (typeof header.id !== "undefined" && header.id !== "") {
      header.appendChild(anchorForId(header.id));
    }
  }
};

document.onreadystatechange = function () {
  if (this.readyState === "complete") {
    const contentBlock = document.getElementsByTagName("body")[0];
    if (!contentBlock) {
      return;
    }
    for (let level = 2; level <= 6; level++) {
      linkifyAnchors(level, contentBlock);
    }
  }
};
