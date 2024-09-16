export function closurePlugin () {
  return {
    name: 'vite:roadroller',
    enforce: 'post',
    renderChunk: async () => {}
  }
}
