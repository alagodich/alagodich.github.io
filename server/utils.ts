import util from 'util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,no-console
export const varDump = (object: any) => console.log(util.inspect(object, {depth: null}));
