import { Throwable } from '~/utils/throwable';

export class UnauthorizedError extends Throwable {
  name = UnauthorizedError.name;
}
