export const kv = await Deno.openKv();

export const voicesEntryKey = ["audios", "total"];

const voicesEntry = await kv.get(voicesEntryKey);
if (!voicesEntry.value) {
  await kv.set(voicesEntryKey, 0);
}

export const sstStatsKey = ["sst", "total"];

const sstStatsEntry = await kv.get(sstStatsKey);
if (!sstStatsEntry.value) {
  await kv.set(sstStatsKey, 0);
}
