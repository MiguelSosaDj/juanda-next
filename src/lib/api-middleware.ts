import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema } from 'zod';
import { actionLogger } from './action-logger';

interface APIHandlerOptions {
  schema?: ZodSchema;
  requireAuth?: boolean;
}

export function createAPIHandler(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: APIHandlerOptions = {}
) {
  return async function(req: NextRequest) {
    try {
      // Validate request body if schema is provided
      if (options.schema && req.method !== 'GET') {
        const body = await req.json();
        options.schema.parse(body);
      }

      // Execute the handler
      const response = await handler(req);

      // Log successful action
      if (req.method !== 'GET') {
        const userId = req.headers.get('x-user-id') || 'anonymous';
        const url = new URL(req.url);
        const entityType = url.pathname.split('/')[2]; // Assumes /api/entityType/...

        await actionLogger.logAction(
          userId,
          req.method === 'POST' ? 'create' : req.method === 'PUT' ? 'update' : 'delete',
          entityType
        );
      }

      return response;
    } catch (error: any) {
      console.error('API Error:', error);

      return NextResponse.json(
        {
          error: error.message || 'Internal Server Error',
          code: error.code || 'INTERNAL_ERROR'
        },
        { 
          status: error.status || 500 
        }
      );
    }
  };
}