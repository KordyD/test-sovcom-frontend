function setUrl(word: string) {
  const url = `https://dictionaryapi.com/api/v3/references/sd3/json/${word}?key=1925da2f-24fe-44bb-bed3-6531e8cf96ff`;
  return url;
}

export async function getWords(query: string) {
  if (query === '') {
    return [];
  }
  const data = await (await fetch(setUrl(query))).json();
  return data;
}
