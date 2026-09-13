import test from 'node:test';
import assert from 'node:assert/strict';
import { MemoNotesStore } from '../src/memoNotesStore.js';

test('creates a record that always ties a note to a memo', () => {
  const store = new MemoNotesStore();

  const record = store.createMemoWithNote({
    title: 'Team standup',
    note: 'Follow up with design before noon.',
    audioUrl: 'blob:audio-id',
  });

  assert.equal(record.title, 'Team standup');
  assert.equal(record.note, 'Follow up with design before noon.');
  assert.equal(record.audioUrl, 'blob:audio-id');
  assert.ok(record.id);
  assert.equal(store.list().length, 1);
});

test('rejects creating a memo without a tied note', () => {
  const store = new MemoNotesStore();

  assert.throws(
    () => store.createMemoWithNote({ title: 'Untied memo', note: '' }),
    /must include both a title and a tied note/i,
  );
});
