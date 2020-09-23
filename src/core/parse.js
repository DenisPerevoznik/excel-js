
export function parse(value = '') {
  try {
    if (value.startsWith('=')) {
      return eval(value.slice(1));
    }
    return value;
  } catch (error) {
    console.log(`Skipping parse error: ${error.message}`);
    return value;
  }
}
