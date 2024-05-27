declare type ObjEntities<T> = [keyof T, T[keyof T]][];

declare type Constructor<T> = new (...args) => T;
declare type AbstractConstructor<T> = abstract new (...args) => T;
declare type AnyConstructor<T> = Constructor<T> | AbstractConstructor<T>;
