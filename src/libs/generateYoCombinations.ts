export default function generateYoCombinations(word: string): string[] {
  const combinations: string[] = [];

  const generate = (current: string, index: number) => {
    const wordInUpperCase = word.toUpperCase();

    if (index === wordInUpperCase.length) {
      combinations.push(current);
      return;
    }

    if (wordInUpperCase[index] === 'Е' || wordInUpperCase[index] === 'Ё') {
      generate(current + 'Е', index + 1);
      generate(current + 'Ё', index + 1);
    } else {
      generate(current + wordInUpperCase[index], index + 1);
    }
  };

  generate('', 0);
  return combinations;
}
