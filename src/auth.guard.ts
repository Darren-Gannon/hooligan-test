import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const httpReq = context.switchToHttp().getRequest();
    const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
    const gqlReq = ctx.getContext().req;
    const req: Request = httpReq ?? gqlReq;
    
    const userId: string = req.headers.authorization?.toString();
    
    if(!userId)
      return false;

    (req as any).user = {
      id: userId
    };

    return true;
  }
}
