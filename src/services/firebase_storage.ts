import app from '../firebase/firebaseInit';
import { StorageReference, UploadTask, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const storage = getStorage();

export const getIncompleteFileStorageReference = (filename: string): StorageReference => {
    return ref(storage, 'incomplete/'.concat(filename))
}

// TODO: Make this async and error handle
export const uploadFileToRef = (ref: StorageReference, file: File): UploadTask => {
    const uploadTask: UploadTask = uploadBytesResumable(ref, file)
    return uploadTask
}