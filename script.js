const projects = [
    {
        title: 'OS',
        description: 'Complex and secure operating system designed in pure HTML + Node.js.',
        tags: ['OS', 'system', 'base'],
        folder: 'OS/',
    },
    {
        title: 'Coming Soon',
        description: null,
        tags: ['next', 'launch'],
        folder: null,
    },
];

const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');
const projectsList = document.getElementById('projectsList');
const resultCount = document.getElementById('resultCount');
const selectedFolderElement = document.getElementById('selectedFolder');

function renderProjects(items) {
    projectsList.innerHTML = items.map(project => {
        const description = project.description || 'No description';
        const tags = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        return `
            <article class="project-card" data-folder="${project.folder || ''}">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${description}</p>
                <div class="project-meta">${tags}</div>
            </article>
        `;
    }).join('');

    resultCount.textContent = items.length;
}

function filterProjects(query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return projects;
    return projects.filter(project => {
        const description = project.description || '';
        return project.title.toLowerCase().includes(normalized)
            || description.toLowerCase().includes(normalized)
            || project.tags.some(tag => tag.toLowerCase().includes(normalized));
    });
}

function updateSelectedFolder(card) {
    const folder = card.dataset.folder;
    const title = card.querySelector('.project-title').textContent;
    const hasFolder = Boolean(folder);
    const href = folder && folder.startsWith('http') ? folder : folder;

    selectedFolderElement.innerHTML = hasFolder
        ? `Proyect <strong>${title}</strong> added: <a href="${href}" target="_blank" rel="noreferrer noopener">${folder}</a>`
        : `Proyect <strong>${title}</strong> added: no folder.`;

    document.querySelectorAll('.project-card.active').forEach(item => item.classList.remove('active'));
    card.classList.add('active');
}

searchInput.addEventListener('input', () => {
    renderProjects(filterProjects(searchInput.value));
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    renderProjects(projects);
});

projectsList.addEventListener('click', event => {
    const card = event.target.closest('.project-card');
    if (!card) return;
    updateSelectedFolder(card);
});

renderProjects(projects);
