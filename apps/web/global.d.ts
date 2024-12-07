interface Window {
  Kakao: {
    init: (key: string) => void;
    isInitialized: () => boolean;
    Link: {
      sendDefault: (options: {
        objectType: 'feed';
        content: {
          title: string;
          description?: string;
          imageUrl?: string;
          link: {
            mobileWebUrl: string;
            webUrl: string;
          };
        };
      }) => void;
    };
  };
}