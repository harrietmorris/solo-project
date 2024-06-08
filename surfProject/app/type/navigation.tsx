export type RootStackParamList = {
    Home: undefined;
    Find: undefined;
    New: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}