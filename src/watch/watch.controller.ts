import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { CreateWatchInput } from "./dto/create-watch.input";
import { WatchService } from "./watch.service";

@ApiBearerAuth()
@Controller('watch')
export class WatchController {
    constructor(private readonly watchService: WatchService) { }

    @Post()
    createWatch(
        @Body() createWatchInput: CreateWatchInput,
        @Req() req: Request,
    ) {
        return this.watchService.create(createWatchInput, req.user);
    }

    @Get()
    findAll(
        @Req() req: Request,
    ) {
        return this.watchService.findAll(req.user);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
        @Req() req: Request,
    ) {
        return this.watchService.findOne(id, req.user);
    }

    @Delete(':id')
    removeWatch(
        @Param('id') id: string,
        @Req() req: Request,
    ) {
        return this.watchService.remove(id, req.user);
    }
}
