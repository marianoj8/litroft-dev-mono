// interface IUploadOptions {
//     url: string;
//     method: 'post' | 'put';
//     file: File;
//     headers?: {[key: string]: string};
// }

// import { TdFileService, IUploadOptions } from '@covalent/core';

// export class Demo {

//     file: File;

//     constructor(private fileUploadService: TdFileService){
//     };

//     uploadEvent(file: File) {
//         let options: IUploadOptions = {
//             url: 'https://url.to/API',
//             method: 'post',
//             file: file
//         };
//         this.fileService.upload(options).subscribe((response) => {
//             // on success
//         });
//     };

// }
