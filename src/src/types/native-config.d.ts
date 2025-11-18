declare module 'react-native-config' {
  export interface NativeConfig {
    TMDB_API_KEY: string;
    TMDB_BASE_URL: string;
    IMAGE_BASE_URL: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
