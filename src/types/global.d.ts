interface Window {
    ethereum: any;
    location: {
        origin: string;
    };
    DocumentTouch;
}
declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
        }
    }
}

declare const DocumentTouch;

// TODO: need to find a better way to handle types
declare module '@walletconnect/web3-provider';
declare module 'burner-provider';
declare module 'pooltogetherjs';
