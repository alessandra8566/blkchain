declare global {
  type EnvAttribute =
    | "VITE_API_URL"
  interface Window {
    _env_: {
      [key in EnvAttribute]: string
    }
  }
}

function parseEnv(attribute: EnvAttribute) {
  return import.meta.env[attribute]
}

export const API_URL = parseEnv("VITE_API_URL")
