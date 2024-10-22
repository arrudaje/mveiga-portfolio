export enum Feature {
    NAVIGATION = 'VITE_USE_NAVIGATION',
}

export const isFeatureEnabled = (feature: Feature) => {
    return import.meta.env[feature] !== '0';
}