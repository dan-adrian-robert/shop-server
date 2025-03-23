import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Client } from 'minio';
import { ConfigService } from "@nestjs/config"


@Injectable()
export class FileUploadService {
  private minioClient: Client;
  private saveUrl: string;
  private bucketName = 'products';

  constructor(private configService: ConfigService) {
    const config: any = {
      endPoint: configService.get<string>('MINI_IO_ENDPOINT'),
      port: configService.get<number>('MINI_IO_PORT'),
      useSSL: this.configService.get<string>('MINIO_USE_SSL') === 'true',
      accessKey: configService.get<string>('MINI_IO_ACCESS_KEY'),
      secretKey: configService.get<string>('MINI_IO_SECRET_KEY'),
    }

    this.minioClient = new Client(config);
    this.saveUrl = configService.get<string>('MINI_IO_URL') as string;
    this.bucketName = configService.get<string>('BUCKET_NAME') as string;
  }

  async uploadImage(file: Express.Multer.File) {
    const objectName = `${Date.now()}-${file.originalname}`;

    const bucketExists = await this.minioClient.bucketExists(this.bucketName).catch(() => false);
    if (!bucketExists) {
      await this.minioClient.makeBucket(this.bucketName, '');
    }

    try {
      await this.minioClient.putObject(
        this.bucketName,
        objectName,
        file.buffer,
        file.size,
        {
          'Content-Type': file.mimetype,
        },
      );
      return {
        url: `${this.saveUrl}/${this.bucketName}/${objectName}`,
        objectName,
      };
    } catch (err) {
      throw new InternalServerErrorException('Failed to upload to MinIO');
    }
  }

  async getAssetUrl(filename: string): Promise<any> {
    return this.minioClient.presignedGetObject(this.bucketName, filename, 24 * 60 * 60);
  }

  async getBulkAssets(body: Array<string>):Promise<Record<string, string> | any> {
    const assetMap = {};
    const promiseList: Array<Promise<any>> = [];

    body.forEach((filename) => {
      promiseList.push(this.getAssetUrl(filename))
    })

    const result:Array<string> = await Promise.all(promiseList);

    body.forEach((filename) => {
      result.forEach((fileUrl) => {
        if(fileUrl.includes(filename)){
          assetMap[filename] = fileUrl;
        }
      })
    })

    return assetMap
  }
}