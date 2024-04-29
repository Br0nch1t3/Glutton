export enum Color {
  BLUE,
  RED,
  PURPLE,
  YELLOW,
  LIGHT_GREEN,
}

export function withColor(color: Color, str: string) {
  switch (color) {
    case Color.BLUE:
      return `\x1b[34m${str}\x1b[0m`;
    case Color.PURPLE:
      return `\x1b[36m${str}\x1b[0m`;
    case Color.RED:
      return `\x1b[31m${str}\x1b[0m`;
    case Color.YELLOW:
      return `\x1b[1;33m${str}\x1b[0m`;
    case Color.LIGHT_GREEN:
      return `\x1b[1;32m${str}\x1b[0m`;
    default:
      return str;
  }
}
