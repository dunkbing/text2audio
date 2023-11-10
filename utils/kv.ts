export const kv = await Deno.openKv();

export const voicesEntryKey = ["audios", "total"];

const voicesEntry = await kv.get(voicesEntryKey);
if (!voicesEntry.value) {
  await kv.set(voicesEntryKey, 0);
}
