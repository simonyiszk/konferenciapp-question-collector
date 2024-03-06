export function UnauthorizedResponse(
  message: string = 'Unauthorized',
): Response {
  return Response.json({ message }, { status: 401 });
}

export function BadRequestResponse(message: string): Response {
  return Response.json({ message }, { status: 400 });
}

export function NotFoundResponse(message: string): Response {
  return Response.json({ message }, { status: 404 });
}

export function RateLimitExceeded(message: string): Response {
  return Response.json({ message }, { status: 429 });
}

export function InternalServerErrorResponse(message: string): Response {
  return Response.json({ message }, { status: 500 });
}

export function OkResponse<T>(data?: T): Response {
  if (!data) return new Response('', { status: 200 });
  return Response.json(data, { status: 200 });
}
