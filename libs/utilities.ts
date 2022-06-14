export const classNames = (
  ...classNames: ReadonlyArray<string | boolean | undefined>
) => classNames.filter(Boolean).join(" ");
