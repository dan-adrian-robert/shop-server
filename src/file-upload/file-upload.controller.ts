import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common"
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger"

import { FileInterceptor } from "@nestjs/platform-express"
import { FileUploadService } from "./file-upload.service"

@ApiTags('File Upload')
@Controller('uploads')
export class FileUploadController {

  constructor(private readonly uploadService: FileUploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.uploadImage(file);
  }

  @Get(':filename')
  async getPresignedUrl(@Param('filename') filename: string) {
    const url = await this.uploadService.getAssetUrl(filename);
    return { url };
  }

  @Post('/bulk')
  async getBulkAssets(@Body() body: Array<string>) {
    return await this.uploadService.getBulkAssets(body);
  }
}
