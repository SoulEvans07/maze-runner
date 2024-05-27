import { Throwable } from './index';

export function handle(e: unknown) {
  const exception = Throwable.from(e);
  return new ErrorHandler(exception);
}

type ErrorHandlerFunction<E> = (error: E) => void;

class ErrorHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private switch: Record<string, ErrorHandlerFunction<any>> = {};
  constructor(private exception: Throwable) {}

  case<E extends Throwable>(type: Constructor<E>, handlerFn: ErrorHandlerFunction<E>) {
    this.switch[type.name] = handlerFn;
    return this;
  }

  else(defaultFn: VoidFunction) {
    if (!this.handle()) defaultFn();
  }

  elseThrow() {
    if (!this.handle()) throw this.exception;
  }

  elseVoid() {
    this.handle();
  }

  private handle() {
    const handlerFn = this.switch[this.exception.name];
    if (!handlerFn) return false;
    handlerFn(this.exception);
    return true;
  }
}
