import app from '../firebase/firebaseInit';
import { StorageReference, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const storage = getStorage();

export const getNewExcelFileReference = (filename: string): StorageReference => {
    return ref(storage, `incomplete/${filename}.xlsx`)
}

export const uploadFileToRef = (ref: StorageReference, file: File) => {
    const uploadTask = uploadBytesResumable(ref, file).then((snapshot) => {
        console.log('Uploaded file')
    })
}