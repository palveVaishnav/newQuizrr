import { atom } from 'recoil';

// Define an atom to hold the user state
export const ProviderUser = atom({
    key: 'userState',
    default: {
        providerId: '',
        name: '',
        email: '',
        picture: '',
    },
});


export const UserAtom = atom({
    key: 'userAtom', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
});
