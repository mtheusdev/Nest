import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const request = context.switchToHttp().getRequest();
        console.log(`Url: ${request.url}`);
        console.log(`Method: ${request.method}`);
        console.log(`Body: ${JSON.stringify(request.body)}`);
        console.log(`After... ${Date.now() - now}ms`);
      }),
    );
  }
}
