function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export class MemoNotesStore {
  constructor() {
    this.records = [];
  }

  createMemoWithNote({ title, note, audioUrl = null }) {
    if (!title || !note) {
      throw new Error('A memo must include both a title and a tied note.');
    }

    const record = {
      id: createId(),
      title,
      note,
      audioUrl,
      createdAt: new Date().toISOString(),
    };

    this.records.unshift(record);
    return record;
  }

  list() {
    return [...this.records];
  }
}
