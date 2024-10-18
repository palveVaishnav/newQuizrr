import { userType } from '@/types/user';
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


export const UserAtom = atom<userType | null>({
    key: 'userAtom',
    default: null,
});
