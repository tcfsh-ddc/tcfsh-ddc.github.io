import { useState } from "#app";

export const WELCOME_VIDEO_STORAGE_KEY = "sh-welcome-video-seen";

export const useInitialLoad = () => {
  const isInitialLoadPreprocessed = useState("sh-initial-load-preprocessed", () => false);
  const isInitialLoadComplete = useState("sh-initial-load-complete", () => false);
  const showWelcomeVideo = useState("sh-show-welcome-video", () => false);

  return {
    isInitialLoadPreprocessed,
    isInitialLoadComplete,
    showWelcomeVideo,
  };
};
