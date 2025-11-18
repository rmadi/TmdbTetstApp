declare module 'react-native-config' {
  interface Env {
    TMDB_API_KEY: string;
    TMDB_BASE_URL: string;
  }
  const Config: Env;
  export default Config;
}
