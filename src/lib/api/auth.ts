const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://api.dvibe.sardarit.cloud";

export type AuthErrorCode = "invalid-credentials" | "email-taken" | "unknown";

export class AuthError extends Error {
  constructor(public code: AuthErrorCode) {
    super(code);
  }
}

type LoginInput = { email: string; password: string };
type RegisterInput = LoginInput & { name: string; phone: string };

async function postAuth(
  path: string,
  body: object,
  errorByStatus: Partial<Record<number, AuthErrorCode>>,
): Promise<void> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
  } catch {
    throw new AuthError("unknown");
  }

  if (!response.ok) {
    throw new AuthError(errorByStatus[response.status] ?? "unknown");
  }
}

export function login(input: LoginInput) {
  return postAuth("/api/auth/login", input, {
    400: "invalid-credentials",
    401: "invalid-credentials",
  });
}

export function register(input: RegisterInput) {
  return postAuth("/api/auth/register", input, { 409: "email-taken" });
}