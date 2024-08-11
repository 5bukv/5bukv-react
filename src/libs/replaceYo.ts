export default function replaceYo(word: string): string {
  return word.replace(/ё/g, 'е').replace(/Ё/g, 'Е');
}
