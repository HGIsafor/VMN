import { MemoNotesStore } from './memoNotesStore.js';

const form = document.getElementById('memo-form');
const list = document.getElementById('memo-list');
const store = new MemoNotesStore();

function render() {
  const records = store.list();
  list.innerHTML = '';

  if (!records.length) {
    const empty = document.createElement('li');
    empty.textContent = 'No memo-note pairs yet.';
    list.appendChild(empty);
    return;
  }

  records.forEach((record) => {
    const item = document.createElement('li');
    item.className = 'memo-item';
    item.innerHTML = `
      <h3>${record.title}</h3>
      <p>${record.note}</p>
      <small>${new Date(record.createdAt).toLocaleString()}</small>
    `;

    if (record.audioUrl) {
      const player = document.createElement('audio');
      player.controls = true;
      player.src = record.audioUrl;
      item.appendChild(player);
    }

    list.appendChild(item);
  });
}

render();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const audioFile = formData.get('audio');
  const audioUrl = audioFile && audioFile.size ? URL.createObjectURL(audioFile) : null;

  store.createMemoWithNote({
    title: String(formData.get('title') || '').trim(),
    note: String(formData.get('note') || '').trim(),
    audioUrl,
  });

  form.reset();
  render();
});
