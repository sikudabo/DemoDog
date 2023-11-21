import Resizer from 'react-image-file-resizer';

function handleImageResize(file: any) {
    return new Promise(resolve => {
        Resizer.imageFileResizer(
            file,
            600,
            600,
            'JPEG',
            100,
            0,
            uri => {
                resolve(uri);
            },
            'blob',
        );
    });
}

export async function resizeImage(file: any) {
    const resizedImage = await handleImageResize(file);
    return resizedImage;
}